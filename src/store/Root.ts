import { action, makeObservable, observable } from "mobx";

export enum GameState {
    MENU, GAME
}

export class RootStore {
    state: GameState = GameState.MENU;

    constructor() {
        makeObservable(this, {
            state: observable,
            startGame: action
        })
    }

    startGame = (values: any) => {
        console.log(values);
        this.state = GameState.GAME;
    }
}
