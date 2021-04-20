import { action, makeObservable, observable } from "mobx";
import { CellStatus } from "../types";
import { getRandomInt } from "../utils/bombs";

export const BOMB = -1;

export class GameField {
    
    // constructor() {
    //     makeObservable(this, {
    //         openCell: action
    //     })
    // }

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
    // bombsSet: Set<number> = generateRandomSet(this.bombs, this.width * this.height - 1);

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

    private shouldHaveBomb() {
        const rnd = getRandomInt({min: 1, max: this.cellsToPlace});
        const result = rnd <= this.bombsToPlace;
        if (result) {
            this.bombsToPlace -= 1;
            console.log(this.bombsToPlace);
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
            toggleFlag: action
        })
    }

    open() {
        if (this.status === CellStatus.INITIAL) {
            this.status = CellStatus.OPEN;
        }
    }

    toggleFlag() {
        if (this.status === CellStatus.INITIAL) {
            this.status = CellStatus.FLAGGED;
            return;
        }
        if (this.status === CellStatus.FLAGGED) {
            this.status = CellStatus.INITIAL;
        }
    }

    getValue() {
        if (this.status !== CellStatus.OPEN) {
            return;
        }
        if (this.hasBomb) return BOMB;
        return 1;
    }

}
