import { action, makeObservable, observable } from "mobx";

import { GameField } from "./GameField";
import { GameState } from '../types';

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
        if (this.state === GameState.PLAYING) {
            this.state = GameState.WON;
        } 
    }

    handleLoose = () => {
        this.state = GameState.LOST;
    }

    startGame = (
        values: {
            width: number;
            height: number;
            bombs: number;
        }
    ) => {
        this.state = GameState.PLAYING;
        this.gameField = new GameField(values.width, values.height, values.bombs, this.handleWin, this.handleLoose);
    }
}
