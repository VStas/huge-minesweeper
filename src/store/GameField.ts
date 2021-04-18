import { action, makeObservable, observable } from "mobx";
import { generateRandomSet } from "../utils/bombs";

export const BOMB = -1;

export class GameField {
    
    // constructor() {
    //     makeObservable(this, {
    //         openCell: action
    //     })
    // }

    cells: Map<number, Cell> = new Map();

    // openCell = (x: number, y: number) => {
    //     const cell = this.getCell(x, y);
    //     cell.isOpen = true;
    // }

    width = 10000;
    height = 10000;

    bombs = 50000000;

    bombsSet: Set<number> = generateRandomSet(this.bombs, this.width * this.height - 1);

    getCell(x: number, y: number) {
        const index = y * this.width + x;
        if (!this.cells.has(index)) {
            const cell = new Cell()
            this.cells.set(index, cell);
            return cell;
        }
        return this.cells.get(index)!;
    }

    getCellValue(x: number, y: number) {
        if (this.bombsSet.has(y * this.width + x)) {
            return BOMB;
        }
        return 1;
    }

    // cells: {isOpen: boolean}[][]

    // constructor() {
    //     this.cells = Array(5).fill(undefined).map((row) => {
    //         return Array(5).fill(undefined).map(() => ({isOpen: true}));
    //     });
    // }
}

export const field = new GameField();

class Cell {
    constructor() {
        // console.log(numOfCells);
        makeObservable(this, {
            isOpen: observable,
            open: action
        })
    }

    open() {
        this.isOpen = true;
    }

    isOpen = true;
}
