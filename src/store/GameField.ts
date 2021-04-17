import { action, makeObservable, observable } from "mobx";

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

    sizeX = 10000;
    sizeY = 10000;
    getCell(x: number, y: number) {
        const index = x * this.sizeX + y;
        if (!this.cells.has(index)) {
            const cell = new Cell()
            this.cells.set(index, cell);
            return cell;
        }
        return this.cells.get(index)!;
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

    isOpen = false;
}
