import { action, makeObservable, observable } from "mobx";
import { GameField } from "./GameField";

export enum GameState {
    MENU, PLAYING, WON, LOST
}

export class RootStore {
    state: GameState = GameState.MENU;
    gameField: GameField | undefined;

    constructor() {
        makeObservable(this, {
            state: observable,
            gameField: observable,
            startGame: action,
            resetGame: action,
            handleWin: action,
            handleLoose: action
        })
    }

    resetGame = () => {
        const {width, height, bombsTotal} = this.gameField!;
        this.state = GameState.PLAYING
        this.gameField = new GameField(width, height, bombsTotal, this.handleWin, this.handleLoose);
    }

    handleWin = () => {
        this.state = GameState.WON;
    }

    handleLoose = () => {
        this.state = GameState.LOST;
    }

    // todo type
    startGame = (values: any) => {
        this.state = GameState.PLAYING;
        this.gameField = new GameField(values.width, values.height, values.bombs, this.handleWin, this.handleLoose);
    }
}
