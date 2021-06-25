export type Vector = number[];
export type VectorLike = Vector | number;

export interface Static {
    position: Vector,
    orientation: number
};

export interface Kinematic {
    position: Vector,
    orientation: number,
    velocity: Vector,
    rotation: number
}

export interface Steering {
    linear: Vector,
    angular: number
};

export interface KinematicCharacter extends Kinematic {
    maxSpeed: number;
    maxRotation: number;
};

export interface ObservableCharacter {
    
}
