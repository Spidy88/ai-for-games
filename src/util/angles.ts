export function degreesAsRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

export function radiansAsDegrees(radians: number) {
    return radians * 180 / Math.PI;
}

export function getShortestRotation(currentDegrees: number, targetDegrees: number) {
    console.log('current orientation and target', currentDegrees, targetDegrees);
    let rotation = targetDegrees - currentDegrees;
    console.log('original desired rotation: ', rotation);
    if (Math.abs(rotation) > 180) {
        console.log('adjusting');
        let adjust = rotation > 0 ? -360 : 360;
        rotation += adjust;
    }

    console.log('desired rotation: ', rotation);
    return rotation;
}

export function getPreferredRotationDirection(currentDegrees: number, targetDegrees: number) {
    let rotation = getShortestRotation(currentDegrees, targetDegrees);
    return rotation > 0 ? 1 : -1;
}
