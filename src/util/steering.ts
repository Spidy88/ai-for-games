import { KinematicCharacter } from "../types";
import { orientationAsVector } from "./vectors";
import { randomBinomial } from "./random";

export function wander(character: KinematicCharacter) {
  let { maxSpeed, maxRotation } = character;
  let direction = orientationAsVector(character.rotation);
  let linear = [maxSpeed * direction.x, maxSpeed * direction.y];
  let angular = randomBinomial() * maxRotation;

  return {
    linear,
    angular
  };
}