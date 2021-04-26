import {getNearby, countNearbyBombs} from './utils';

describe('should return indexes of nearby cells', () => {
    const width = 3;
    const height = 3;
    // [
    //     0, 1, 2,
    //     3, 4, 5,
    //     6, 7, 8
    // ];

    it('corner', () => {
        expect(getNearby(0, width, height)).toEqual([1, 3, 4]);
        expect(getNearby(2, width, height)).toEqual([1, 4, 5]);
    });

    it('side', () => {
        expect(getNearby(3, width, height)).toEqual([0, 1, 4, 6, 7]);
        expect(getNearby(7, width, height)).toEqual([3, 4, 5, 6, 8]);
    });

    it('center', () => {
        expect(getNearby(4, width, height)).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
    });
})

describe('should return amount of nearby bombs', () => {
    const width = 3;
    const height = 3;
    const hasBomb = (index: number) => (index === 2 || index === 4);
    // [
    //     0,   1,    Bomb
    //     3,   Bomb, 5,
    //     6,   7,    8
    // ];

    it('one bomb', () => {
        expect(countNearbyBombs(0, width, height, hasBomb)).toEqual(1);
        expect(countNearbyBombs(3, width, height, hasBomb)).toEqual(1);
        expect(countNearbyBombs(6, width, height, hasBomb)).toEqual(1);
        expect(countNearbyBombs(7, width, height, hasBomb)).toEqual(1);
        expect(countNearbyBombs(8, width, height, hasBomb)).toEqual(1);
    });

    it('two bombs', () => {
        expect(countNearbyBombs(1, width, height, hasBomb)).toEqual(2);
        expect(countNearbyBombs(5, width, height, hasBomb)).toEqual(2);
    });
});
