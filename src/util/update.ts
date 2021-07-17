import { Character } from "../models/character";
import { Steering, KinematicCharacter, Vector } from "../types";
import { clamp } from "./random";
import { add, mult, normalize, length } from "./vectors";

export function standardKinematicUpdate(delta: number, steering: Steering, character: KinematicCharacter) {
    let half_t_sq = 0.5 * delta * delta;
    character.position = add(
        character.position,
        add(
            mult(character.velocity, delta),
            mult(steering.linear, half_t_sq)
        )
    );
    character.orientation += character.rotation * delta + steering.angular * half_t_sq;

    character.velocity = add(character.velocity, mult(steering.linear, delta));
    character.rotation += steering.angular * delta;
}

export function newtonEuler1Update(delta: number, steering: Steering, character: KinematicCharacter) {
    character.position = add(
        character.position,
        mult(character.velocity, delta)
    );
    character.orientation += character.rotation * delta;

    character.velocity = add(character.velocity, mult(steering.linear, delta));
    character.rotation += steering.angular * delta;
}

export function kinematicUpdate(delta: number, steering: Steering, character: KinematicCharacter) {
    character.position = add(character.position, mult(character.velocity, delta));
    character.orientation += character.rotation * delta;

    character.velocity = steering.linear;
    character.rotation = steering.angular;
}

export function clampKinematics(character: Character) {
    if (length(character.velocity) > character.maxSpeed) {
        character.velocity = mult(normalize(character.velocity), character.maxSpeed);
    }

    character.rotation = clamp(character.rotation, -character.maxRotation, character.maxRotation);
}

export function keepOnScreenWithSeamless(character: KinematicCharacter, size: Vector) {
    if (character.position[0] > size[0]) character.position = [0, character.position[1]];
    if (character.position[0] < 0) character.position = [size[0], character.position[1]];
    if (character.position[1] > size[1]) character.position = [character.position[0], 0];
    if (character.position[1] < 0) character.position = [character.position[0], size[1]];
}

export function keepOnScreenWithBlock(character: KinematicCharacter, size: Vector, padding: number = 0) {
    const left = padding;
    const right = size[0] - padding;
    const top = padding;
    const bottom = size[1] - padding;
    if (character.position[0] > right) character.position = [right, character.position[1]];
    if (character.position[0] < left) character.position = [left, character.position[1]];
    if (character.position[1] > bottom) character.position = [character.position[0], bottom];
    if (character.position[1] < top) character.position = [character.position[0], top];
}
