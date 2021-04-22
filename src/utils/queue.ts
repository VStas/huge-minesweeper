// можно было оба указателя -1 делать когда пустое

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

    Front(): T | -1 {
        const value = this.queue[this.frontIdx]
        return value === undefined ? -1 : value;;
    }

    Rear(): T | -1 {
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

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */