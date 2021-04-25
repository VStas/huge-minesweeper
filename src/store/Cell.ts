import { action, makeObservable, observable } from "mobx";
import { CellStatus } from "../types";

export class Cell {
    status = CellStatus.INITIAL;

    hasBomb: boolean | undefined;

    constructor() {
        makeObservable(this, {
            status: observable,
            // hasBomb: observable,
            open: action,
        })
    }

    open() {
        this.status = CellStatus.OPEN;
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
}
