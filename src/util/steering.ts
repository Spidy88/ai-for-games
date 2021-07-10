import { KinematicCharacter } from "../types";
import { orientationAsVector, normalize, sub, mult, vectorAsOrientation } from "./vectors";
import { getShortestRotation } from "./angles";
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
  let rotation = 0;
  let angular = rotation * maxRotation;

  return {
    linear,
    angular
  };
}

export function seekWithRotation(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed, maxRotation, orientation } = character;
  let direction = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(direction);
  let rotation = getShortestRotation(orientation, targetOrientation);
  let linear = mult(direction, maxSpeed);
  let angular = rotation * maxRotation;
  
  return {
    linear,
    angular
  };
}
