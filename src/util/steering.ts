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
  let { maxSpeed } = character;
  let direction = normalize(sub(target.position, character.position));
  let linear = mult(direction, maxSpeed);
  let angular = 0;

  return {
    linear,
    angular
  };
}

export function seekWithRotation(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed, orientation } = character;
  let direction = orientationAsVector(orientation);
  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotation = getShortestRotation(orientation, targetOrientation);
  let linear = mult(direction, maxSpeed);
  let angular = rotation;
  
  return {
    linear,
    angular
  };
}
