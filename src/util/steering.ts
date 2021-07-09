import { KinematicCharacter } from "../types";
import { orientationAsVector, normalize, sub, mult } from "./vectors";
import { randomBinomial } from "./random";

export function wander(character: KinematicCharacter) {
  let { maxSpeed, maxRotation } = character;
  let direction = orientationAsVector(character.orientation);
  let linear = mult(direction, maxSpeed);
  let angular = randomBinomial() * maxRotation;

  return {
    linear,
    angular
  };
}

export function seek(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed, maxRotation } = character;
  let direction = normalize(sub(target.position, character.position));
  let linear = mult(direction, maxSpeed);
  let rotation = 0; // character.orientation -> orientation of direction (shortest rotation)
  let angular = rotation * maxRotation;

  return {
    linear,
    angular
  };
}
