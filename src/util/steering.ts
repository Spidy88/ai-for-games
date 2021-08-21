import { DynamicCharacter, KinematicCharacter } from '../types';
import { orientationAsVector, normalize, sub, mult, div, vectorAsOrientation, length } from './vectors';
import { getPreferredRotationDirection, getShortestRotation } from './angles';
import { randomBinomial } from './random';

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

export type ArriveOptions = {
  stopRadius: number;
  timeToTarget: number;
};
export function arrive(character: KinematicCharacter, target: KinematicCharacter, options: ArriveOptions) {
  const { stopRadius, timeToTarget } = options;
  let direction = sub(target.position, character.position);
  let distance = length(direction);
  let linear = div(direction, timeToTarget);
  let angular = 0;

  if (distance <= stopRadius) {
    return null;
  }

  return {
    linear,
    angular
  };
}

export function arriveWithRotation(character: KinematicCharacter, target: KinematicCharacter, options: ArriveOptions) {
  const { orientation } = character;
  const { stopRadius, timeToTarget } = options;

  let targetDirection = sub(target.position, character.position);
  let distance = length(targetDirection);
  let direction = orientationAsVector(orientation);
  let targetOrientation = vectorAsOrientation(normalize(targetDirection), orientation);
  let linear = mult(direction, distance / timeToTarget);
  let angular = getShortestRotation(orientation, targetOrientation);

  if (distance <= stopRadius) {
    return null;
  }
  
  return {
    linear,
    angular
  };
}

export function dynamicSeek(character: DynamicCharacter, target: DynamicCharacter) {
  let { maxAcceleration } = character;
  let direction = normalize(sub(target.position, character.position));
  let linear = mult(direction, maxAcceleration);
  let angular = 0;

  return {
    linear,
    angular
  };
}

export function dynamicSeekWithRotation(character: DynamicCharacter, target: DynamicCharacter) {
  let { maxAcceleration, maxRotation, orientation } = character;
  let direction = orientationAsVector(orientation);
  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let linear = mult(direction, maxAcceleration);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}

export function dynamicSeekOmnidirectional(character: DynamicCharacter, target: DynamicCharacter) {
  let { maxAcceleration, maxRotation, orientation } = character;
  let direction = normalize(sub(target.position, character.position));
  let linear = mult(direction, maxAcceleration);
  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}

export function dynamicFlee(character: DynamicCharacter, target: DynamicCharacter) {
  let { maxAcceleration } = character;
  let direction = normalize(sub(character.position, target.position));
  let linear = mult(direction, maxAcceleration);
  let angular = 0;

  return {
    linear,
    angular
  };
}

export function dynamicFleeWithRotation(character: DynamicCharacter, target: DynamicCharacter) {
  let { maxAcceleration, maxRotation, orientation } = character;
  let direction = orientationAsVector(orientation);
  let targetDirection = normalize(sub(character.position, target.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let linear = mult(direction, maxAcceleration);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}

export function dynamicFleeOmnidirectional(character: DynamicCharacter, target: DynamicCharacter) {
  let { maxAcceleration, maxRotation, orientation } = character;
  let direction = normalize(sub(character.position, target.position));
  let linear = mult(direction, maxAcceleration);
  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);
  let angular = maxRotation * rotationDirection;
  
  return {
    linear,
    angular
  };
}

export type DynamicArriveOptions = {
  slowRadius: number;
  stopRadius: number;
  timeToTarget: number;
};

export function dynamicArrive(character: DynamicCharacter, target: DynamicCharacter, options: DynamicArriveOptions) {
  const { maxSpeed, maxAcceleration } = character;
  const { slowRadius, stopRadius, timeToTarget } = options;
  let direction = sub(target.position, character.position);
  let distance = length(direction);

  if (distance <= stopRadius) {
    return null;
  }

  let targetSpeed = maxSpeed;
  if (distance <= slowRadius) {
    targetSpeed = maxSpeed * distance / timeToTarget;
  }

  let targetVelocity = mult(normalize(direction), targetSpeed);
  let linear = div(sub(targetVelocity, character.velocity), timeToTarget);
  let angular = 0;

  if (length(linear) > maxAcceleration) {
    linear = mult(normalize(linear), maxAcceleration);
  }

  return {
    linear,
    angular
  };
}

export function dynamicArriveWithRotation(character: DynamicCharacter, target: DynamicCharacter, options: DynamicArriveOptions) {
  const { maxSpeed, maxAcceleration, maxRotation, orientation } = character;
  const { slowRadius, stopRadius, timeToTarget } = options;
  let direction = sub(target.position, character.position);
  let distance = length(direction);
  let orientationDirection = orientationAsVector(orientation);
  let targetOrientation = vectorAsOrientation(normalize(direction), orientation);
  let rotationDirection = getPreferredRotationDirection(orientation, targetOrientation);

  if (distance <= stopRadius) {
    return null;
  }

  let targetSpeed = maxSpeed;
  if (distance <= slowRadius) {
    targetSpeed = maxSpeed * distance / timeToTarget;
  }

  let targetVelocity = mult(normalize(orientationDirection), targetSpeed);
  let linear = div(sub(targetVelocity, character.velocity), timeToTarget);
  let angular = maxRotation * rotationDirection;

  if (length(linear) > maxAcceleration) {
    linear = mult(normalize(linear), maxAcceleration);
  }

  return {
    linear,
    angular
  };
}

export type DynamicAlignOptions = {
  stopDelta: number;
  slowDelta: number;
  timeToTarget: number;
};
export function dynamicAlign(character: DynamicCharacter, target: DynamicCharacter, options: DynamicAlignOptions) {
  const { maxRotation, maxAngularAcceleration } = character;
  const { slowDelta, stopDelta, timeToTarget } = options;

  let targetDirection = normalize(sub(target.position, character.position));
  let targetOrientation = vectorAsOrientation(targetDirection, character.orientation);
  let rotation = getShortestRotation(character.orientation, targetOrientation);
  let rotationSize = Math.abs(rotation);
  
  if (rotationSize < stopDelta) {
    return null;
  }

  let targetRotation = rotationSize > stopDelta
    ? maxRotation
    : maxRotation * rotationSize / slowDelta;

  targetRotation *= rotation / rotationSize;

  let angular = (targetRotation - character.rotation) / timeToTarget;
  let angularAcceleration = Math.abs(angular);
  if (angularAcceleration > maxAngularAcceleration) {
    angular = angular / angularAcceleration * maxAngularAcceleration;
  }

  return {
    linear: [0, 0],
    angular
  };
}

export function dynamicVelocityMatch(character: DynamicCharacter, target: DynamicCharacter) {
  const timeToTarget = 0.1;
  const { maxAcceleration } = character;

  let linear = div(sub(target.velocity, character.velocity), timeToTarget);
  if (length(linear) > maxAcceleration) {
    linear = mult(normalize(linear), maxAcceleration);
  }

  return {
    linear,
    angular: 0
  };
}
