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

/*
sizeX x sizeY
2     x   2

index = y * this.sizeX + x
0 1 2 3
*/
