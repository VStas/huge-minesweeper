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
export function coordsToIdx(x: number, y: number, width: number) {
    return y * width + x;
}

export function getRandomInt({min, max}: {min: number, max: number}) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getNearby(idx: number, width: number, height: number) {
    const y = Math.floor(idx / width);
    const x = idx - y * width;
    const maxX = width - 1;
    const maxY = height - 1;

    const res: number[] = [];
    if (y > 0 && x > 0) {
        res.push(coordsToIdx(x-1, y-1, width));
    }
    if (y > 0) {
        res.push(coordsToIdx(x, y-1, width));
    }
    if (y > 0 && x < maxX) {
        res.push(coordsToIdx(x+1, y-1, width));
    }
    if (x > 0) {
        res.push(coordsToIdx(x-1, y, width));
    }
    if (x < maxX) {
        res.push(coordsToIdx(x+1, y, width));
    }
    if (y < maxY && x > 0) {
        res.push(coordsToIdx(x-1, y+1, width));
    }
    if (y < maxY) {
        res.push(coordsToIdx(x, y+1, width));
    }
    if (y < maxY && x < maxX) {
        res.push(coordsToIdx(x+1, y+1, width));
    }
    return res;
}

export function countNearbyBombs(idx: number, width: number, height: number, hasBomb: (idx: number) => boolean) {
    // if (x === 5 && y === 5) {
    //     console.log('counting')
    // }
    return getNearby(idx, width, height).reduce(
        (prev, current) => prev + (hasBomb(current) ? 1 : 0),
        0
    );
}
/*
sizeX x sizeY
2     x   2

index = y * this.sizeX + x
0 1 2 3
*/
