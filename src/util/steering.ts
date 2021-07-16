import { KinematicCharacter } from "../types";
import { orientationAsVector, normalize, sub, mult, vectorAsOrientation } from "./vectors";
import { getPreferredRotationDirection } from "./angles";
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
  let { maxSpeed, maxRotation, orientation } = character;
  let direction = orientationAsVector(orientation);
  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let linear = mult(direction, maxSpeed);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}

export function flee(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed } = character;
  let direction = normalize(sub(character.position, target.position));
  let linear = mult(direction, maxSpeed);
  let angular = 0;

  return {
    linear,
    angular
  };
}

export function fleeWithRotation(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed, maxRotation, orientation } = character;
  let direction = orientationAsVector(orientation);
  let targetDirection = normalize(sub(character.position, target.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let linear = mult(direction, maxSpeed);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}

export function arrive(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed } = character;
  let direction = normalize(sub(target.position, character.position));
  let linear = mult(direction, maxSpeed);
  let angular = 0;

  return {
    linear,
    angular
  };
}

export function arriveWithRotation(character: KinematicCharacter, target: KinematicCharacter) {
  let { maxSpeed, maxRotation, orientation } = character;
  let direction = orientationAsVector(orientation);
  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let linear = mult(direction, maxSpeed);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}
