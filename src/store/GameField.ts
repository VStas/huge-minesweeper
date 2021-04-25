import { action, computed, makeObservable, observable } from "mobx";

import { CellStatus } from "../types";
import { getRandomInt, countNearbyBombs, getNearby } from "../utils/bombs";
import { CircularQueue } from "../utils/queue";
import { Cell } from "./Cell";

export const BOMB = -1;

export class GameField {
    private cells: Cell[];

    /* To show to user */
    cellsToOpen: number;

    /* For dynamic field generation */
    private cellsLeftToPlaceBombs: number;
    private bombsToPlace: number;

    flagsPlaced = 0;

    get flagsLeft() {
        return this.bombsTotal - this.flagsPlaced;
    }

    constructor(
        public width: number,
        public height: number,
        public bombsTotal: number,
        private onWin: () => void,
        private onLoose: () => void
    ) {
        this.cells = [];
        this.cellsLeftToPlaceBombs = this.width * this.height;
        this.cellsToOpen = this.width * this.height - this.bombsTotal;
        this.bombsToPlace = this.bombsTotal;
        makeObservable(this, {
            cellsToOpen: observable,
            flagsPlaced: observable,
            flagsLeft: computed,
            toggleFlag: action,
            openCell: action
        });
    }

    getCell(index: number) {
        if (!this.cells[index]) {
            const cell = new Cell();
            this.cells[index] = cell;
            return cell;
        }
        return this.cells[index];
    }

    getCellByCoords(x: number, y: number) {
        const index = y * this.width + x;
        return this.getCell(index);
    }

    toggleFlag(x: number, y: number) {
        const index = y * this.width + x;
        const cell = this.cells[index];
        this.flagsPlaced += cell.toggleFlag(this.flagsPlaced < this.bombsTotal);
    }

    openCell(cell: Cell) {
        cell.open();
        this.cellsToOpen -= 1;
        if (this.cellsToOpen === 0) {
            this.onWin();
        }
    }

    hasBomb = (index: number) => {
        const cell = this.getCell(index);
        if (cell.hasBomb === undefined) {
            cell.hasBomb = this.shouldHaveBomb();
        }
        return cell.hasBomb;
    }

    getValue(index: number) {
        if (this.hasBomb(index)) {
            return BOMB;
        }
        return countNearbyBombs(index, this.width, this.height, this.hasBomb);
    }

    getValueByCoords(x: number, y: number) {
        const index = y * this.width + x;
        return this.getValue(index);
    }

    private shouldHaveBomb() {
        // first time always not bomb
        if (this.cellsLeftToPlaceBombs === this.width * this.height) {
            this.cellsLeftToPlaceBombs -= 1;
            return false;
        }

        const rnd = getRandomInt({min: 1, max: this.cellsLeftToPlaceBombs});
        const result = rnd <= this.bombsToPlace;
        if (result) {
            this.bombsToPlace -= 1;
        }
        this.cellsLeftToPlaceBombs -= 1;
        return result;
    }

    private queue = new CircularQueue<number>(this.width * this.height);

    open(x: number, y: number) {
        const index = y * this.width + x;
        const cell = this.cells[index];
        this.openCell(cell);
        const value = this.getValue(index);
        if (value === BOMB) {
            this.onLoose();
        }
        if (value !== 0) {
            return;
        }
        this.queue.enQueue(index);
        this.openRecursive();
    }

    isOpeningRecursively = false;

    async openRecursive() {
        if (this.isOpeningRecursively) {
            return;
        }
        this.isOpeningRecursively = true;
        let counter = 0;
        while (this.queue.Front() !== -1) {
            counter += 1;
            const index = this.queue.Front() as number;
            this.queue.deQueue();

            getNearby(index, this.width, this.height)
                .forEach((index) => {
                    const cell = this.cells[index];
                    if (cell.status === CellStatus.INITIAL) {
                        this.openCell(cell);
                        if (this.getValue(index) === 0) {
                            this.queue.enQueue(index);
                        }
                    }
                });
            if (counter === 100) {
                counter = 0;
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }
        this.isOpeningRecursively = false;
    }
}
