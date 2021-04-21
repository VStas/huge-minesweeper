import { action, computed, makeObservable, observable } from "mobx";
import { CellStatus } from "../types";
import { getRandomInt, countNearbyBombs } from "../utils/bombs";

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
        const cell = this.getCell(x, y); // no need really
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
    status = CellStatus.OPEN;

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
