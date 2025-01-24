export class Rating {
    constructor(
        public readonly value: number,
        public readonly maximum: number,
        public readonly count: number
    ) {}
}