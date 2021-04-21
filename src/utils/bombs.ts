// export function generateRandomSet(size: number, maxValue: number): Set<number> {
//     const result = new Set<number>();
//     for (let i = maxValue - size + 1; i <= maxValue; i++) {
//         const randomNumber = getRandomInt(0, i);
//         if (result.has(randomNumber)) {
//             result.add(i);
//         } else {
//             result.add(randomNumber);
//         }
//     }
//     return result;
// }


export function getRandomInt({min, max}: {min: number, max: number}) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getNearbyCoords(x: number, y: number, maxX: number, maxY: number) {
    const res: [number, number][] = [];
    if (y > 0 && x > 0) {
        res.push([x-1, y-1]);
    }
    if (y > 0) {
        res.push([x, y-1]);
    }
    if (y > 0 && x < maxX) {
        res.push([x+1, y-1]);
    }
    if (x > 0) {
        res.push([x-1, y]);
    }
    if (x < maxX) {
        res.push([x+1, y]);
    }
    if (y < maxY && x > 0) {
        res.push([x-1, y+1]);
    }
    if (y < maxY) {
        res.push([x, y+1]);
    }
    if (y < maxY && x < maxX) {
        res.push([x+1, y+1]);
    }
    return res;
}

export function countNearbyBombs(x: number, y: number, maxX: number, maxY: number, hasBomb: (x: number, y: number) => boolean) {
    if (x === 5 && y === 5) {
        console.log('counting')
    }
    return getNearbyCoords(x, y, maxX, maxY).reduce(
        (prev, current) => prev + (hasBomb(...current) ? 1 : 0),
        0
    );
}
/*
sizeX x sizeY
2     x   2

index = y * this.sizeX + x
0 1 2 3
*/
