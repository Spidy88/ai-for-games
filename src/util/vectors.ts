import { Vector, VectorLike } from '../types';

export function add(v1: Vector, v2: VectorLike) {
    if (typeof v2 === 'number') {
        return _addS(v1, v2);
    }
  
    if (v1.length !== v2.length) {
    throw new Error("Cannot add two vectors of different shapes");
    }

    return _addV(v1, v2);
  }
  
  export function sub(v1: Vector, v2: VectorLike) {
      if (typeof v2 === 'number') {
          return _addS(v1, -v2);
      }

      if (v1.length !== v2.length) {
        throw new Error("Cannot add two vectors of different shapes");
      }
  
      let v2Neg = v2.map((v) => -v);
      return _addV(v1, v2Neg);
    }
  
  export function mult(v1: Vector, v2: VectorLike) {
      if (typeof v2 === 'number') {
        return _multS(v1, v2);
      }

      if (v1.length !== v2.length) {
        throw new Error("Cannot add two vectors of different shapes");
      }
  
      return _multV(v1, v2);
  }
  
  export function div(v1: Vector, v2: VectorLike) {
      if (typeof v2 === 'number') {
        return _multS(v1, 1 / v2);
      }

      if (v1.length !== v2.length) {
        throw new Error("Cannot add two vectors of different shapes");
      }
  
      let v2Inv = v2.map((v) => 1 / v);
      return _multV(v1, v2Inv);
  }
  
  export function length(v: Vector) {
    return Math.sqrt(v.reduce((sum, value) => sum + value ** 2, 0));
  }
  
  function _addV(v1: Vector, v2: Vector) {
    return v1.map((v, i) => v + v2[i]);
  }
  
  function _addS(v1: Vector, s: number) {
    return v1.map((v) => v + s);
  }
  
  function _multV(v1: Vector, v2: Vector) {
    return v1.map((v, i) => v * v2[i]);
  }
  
  function _multS(v1: Vector, s: number) {
    return v1.map((v) => v * s);
  }

  export function normalize(vector: Vector) {
    let magnitude = length(vector);
    return vector.map(val => val / magnitude);
  }

  function degreesAsRadians(degrees: number) {
    return degrees * 0.017453;
  }
  
  export function orientationAsVector(orientation: number) {
    const radians = degreesAsRadians(orientation);
    return {
      x: -Math.sin(radians),
      y: Math.cos(radians),
    };
  }

  export function vectorAsOrientation(velocity: Vector) {
    if (length(velocity) === 0) {
      return -1;
    }
  
    return Math.atan2(-velocity[0], velocity[1]);
  }
  