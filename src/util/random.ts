export function randomBinomial() {
    return Math.random() - Math.random();
}

export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
