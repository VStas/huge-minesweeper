import {GameField} from './GameField';

// [
//     0,    BOMB, 2,
//     BOMB, 4,    5,
//     6,    7,    8
// ];

describe('GameField', () => {
    const width = 3;
    const height = 3;
    const bombsTotal = 2;
    const pseudoRndGenerator = () => {
        let counter = bombsTotal;
        return () => {
            if (counter > 0) {
                counter -= 1;
                return 1; // bomb
            }
            return 1000; // no bomb
        }
    }
    
    let handleWin: jest.Mock;
    let handleLoose: jest.Mock;
    let gameField: GameField

    beforeEach(() => {
        handleWin = jest.fn().mockName('handleWin');
        handleLoose = jest.fn().mockName('handleLoose');
        gameField = new GameField(width, height, bombsTotal, handleWin, handleLoose,  pseudoRndGenerator());

        /* rendering imitation */
        gameField.getCellByCoords(0, 0);
        gameField.getCellByCoords(0, 1);
        gameField.getCellByCoords(0, 2);
        gameField.getCellByCoords(1, 0);
        gameField.getCellByCoords(1, 1);
        gameField.getCellByCoords(1, 2);
        gameField.getCellByCoords(2, 0);
        gameField.getCellByCoords(2, 1);
        gameField.getCellByCoords(2, 2);
    });


    it('loose', () => {
        gameField.open(0, 0);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.open(0, 1);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).toBeCalled();
    });

    it('win', () => {
        gameField.open(0, 0);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.toggleFlag(0, 1);
        gameField.toggleFlag(1, 0);
        expect(gameField.flagsLeft).toEqual(0);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.open(0, 2);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.open(1, 1);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.open(1, 2);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.open(2, 0);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();

        gameField.open(2, 1);
        expect(handleWin).not.toBeCalled();
        expect(handleLoose).not.toBeCalled();
    
        gameField.open(2, 2);
        expect(handleWin).toBeCalled();
        expect(handleLoose).not.toBeCalled();
    });
})
