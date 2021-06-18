import { Vector, length } from "./vectors";

export function velocity2Orientation(velocity: Vector) {
  if (length(velocity) === 0) {
    return -1;
  }

  return Math.atan2(-velocity[0], velocity[1]);
}