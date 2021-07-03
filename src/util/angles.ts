export function degreesAsRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

export function radiansAsDegrees(radians: number) {
    return radians * 180 / Math.PI;
}

export function getShortestRotation(currentDegrees: number, targetDegrees: number) {
    let rotation = targetDegrees - currentDegrees;
    if (Math.abs(rotation) > 180) {
        let adjust = rotation > 0 ? -360 : 360;
        rotation += adjust;
    }

    return rotation;
}

export function getPreferredRotationDirection(currentDegrees: number, targetDegrees: number) {
    let rotation = getShortestRotation(currentDegrees, targetDegrees);
    return rotation > 0 ? 1 : -1;
}
