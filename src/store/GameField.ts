import { action, computed, makeObservable, observable } from "mobx";
import { CellStatus } from "../types";
import { getRandomInt, countNearbyBombs, getNearbyCoords } from "../utils/bombs";
import { CircularQueue } from "../utils/queue";

export const BOMB = -1;

export class GameField {
    
    // constructor() {
    //     makeObservable(this, {
    //         openCell: action
    //     })
    // }

    constructor() {
        // console.log(numOfCells);
        makeObservable(this, {
            flagsPlaced: observable,
            flagsLeft: computed,
            toggleFlag: action
        });
    }
    cells: Cell[] = [];

    // openCell = (x: number, y: number) => {
    //     const cell = this.getCell(x, y);
    //     cell.isOpen = true;
    // }

    width = 10000;
    height = 10000;

    bombsTotal = 10000000;

    cellsToPlace = this.width * this.height;
    bombsToPlace = this.bombsTotal;

    queue = new CircularQueue<[number, number]>(this.width * this.height);
    flagsPlaced = 0;
    // bombsSet: Set<number> = generateRandomSet(this.bombs, this.width * this.height - 1);

    get flagsLeft() {
        return this.bombsTotal - this.flagsPlaced;
    }

    toggleFlag(x: number, y: number) {
        const index = y * this.width + x;
        const cell = this.cells[index];
        this.flagsPlaced += cell.toggleFlag(this.flagsPlaced < this.bombsTotal);
    }

    // ячейка точно INITIAL
    open(x: number, y: number) {
        const index = y * this.width + x;
        const cell = this.cells[index];
        cell.open();
        const value = this.getValue(x, y);
        if (value !== 0) {
            return;
        }
        this.queue.enQueue([x, y]);
        this.openRecursive();
    }

    working = false;

    async openRecursive() {
        if (this.working) {
            return;
        }
        this.working = true;
        console.log(true);
        let counter = 0;
        while (this.queue.Front() !== -1) {
            counter += 1;
            const [x, y] = this.queue.Front() as [number, number];
            this.queue.deQueue();

            getNearbyCoords(x, y, this.width - 1, this.height - 1)
                .forEach(([x, y]) => {
                // console.log([x, y]);
                    const index = y * this.width + x;
                    const cell = this.cells[index];
                    if (cell.status === CellStatus.INITIAL) {
                        cell.open();
                        if (this.getValue(x, y) === 0) {
                            this.queue.enQueue([x, y]);
                        }
                    }
                });
            if (counter === 100) {
                counter = 0;
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }
        this.working = false;
        console.log(false);
    }

    getCell(x: number, y: number) {
        const index = y * this.width + x;
        if (!this.cells[index]) {
            const cell = new Cell(this.shouldHaveBomb());
            this.cellsToPlace -= 1;
            this.cells[index] = cell;
            return cell;
        }
        return this.cells[index];
    }

    getValue(x: number, y: number) {
        const index = y * this.width + x;
        const cell = this.cells[index];
        if (cell.hasBomb) {
            return BOMB;
        }
        return countNearbyBombs(x, y, this.width - 1, this.height - 1, (x, y) => this.getCell(x, y).hasBomb);
    }

    private shouldHaveBomb() {
        const rnd = getRandomInt({min: 1, max: this.cellsToPlace});
        const result = rnd <= this.bombsToPlace;
        if (result) {
            this.bombsToPlace -= 1;
            // console.log(this.bombsToPlace);
        }
        return result;
    }

    // getCellValue(x: number, y: number) {
    //     if (this.bombsSet.has(y * this.width + x)) {
    //         return BOMB;
    //     }
    //     return 1;
    // }

    // cells: {isOpen: boolean}[][]

    // constructor() {
    //     this.cells = Array(5).fill(undefined).map((row) => {
    //         return Array(5).fill(undefined).map(() => ({isOpen: true}));
    //     });
    // }
}

export const field = new GameField();

class Cell {
    status = CellStatus.INITIAL;

    constructor(public hasBomb: boolean) {
        // console.log(numOfCells);
        makeObservable(this, {
            status: observable,
            hasBomb: observable,
            open: action,
            // toggleFlag: action
        })
    }

    open() {
        if (this.status === CellStatus.INITIAL) {
            this.status = CellStatus.OPEN;
        }
    }

    toggleFlag(canFlag: boolean) {
        if (canFlag && this.status === CellStatus.INITIAL) {
            this.status = CellStatus.FLAGGED;
            return 1;
        }
        if (this.status === CellStatus.FLAGGED) {
            this.status = CellStatus.INITIAL;
            return -1;
        }
        return 0;
    }

    getValue() {
        if (this.status !== CellStatus.OPEN) {
            return;
        }
        if (this.hasBomb) return BOMB;
        return 1;
    }

}
