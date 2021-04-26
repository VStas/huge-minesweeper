// Circular buffer
// Implemented using array

export class CircularQueue<T> {
    queue: (T  | undefined)[] = [];
    size;
    frontIdx;
    backIdx;

    constructor(k: number) {
        this.size = k;
        this.frontIdx = k - 1;
        this.backIdx = k - 1;
    }

    enQueue(value: T): boolean {
        if (this.isFull()) {
            return false;
        }
        this.queue[this.backIdx] = value;
        this.backIdx -= 1;
        if (this.backIdx === -1) {
            this.backIdx += this.size;
        }
        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) {
            return false;
        }
        this.queue[this.frontIdx] = undefined;
        this.frontIdx -= 1;
        if (this.frontIdx === -1) {
            this.frontIdx += this.size;
        }
        return true;
    }

    front(): T | -1 {
        const value = this.queue[this.frontIdx]
        return value === undefined ? -1 : value;;
    }

    rear(): T | -1 {
        let rearIdx = this.backIdx + 1;
        if (rearIdx === this.size) {
            rearIdx -= this.size;
        }
        const value = this.queue[rearIdx]
        return value === undefined ? -1 : value;
    }

    isEmpty(): boolean {
        return (this.frontIdx === this.backIdx && this.queue[this.frontIdx] === undefined);
    }

    isFull(): boolean {
        return (this.frontIdx === this.backIdx && this.queue[this.frontIdx] !== undefined);
    }
}
