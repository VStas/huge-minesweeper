import { makeObservable, observable } from "mobx";

export class GameField {
    cells: Map<number, Cell> = new Map();

    
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
        makeObservable(this, {
            isOpen: observable
        })
    }

    isOpen = false;
}
