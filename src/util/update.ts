import { Steering, KinematicCharacter, Vector } from "../types";
import { add, mult, normalize, length } from "./vectors";

export function kinematicUpdate(delta: number, steering: Steering, character: KinematicCharacter) {
    delta /= 10;
    character.position = add(character.position, mult(character.velocity, delta));
    character.orientation = character.orientation + character.rotation * delta;

    character.velocity = add(character.velocity, mult(steering.linear, delta));
    character.rotation += steering.angular * delta;

    if (length(character.velocity) > character.maxSpeed) {
        character.velocity = mult(normalize(character.velocity), character.maxSpeed);
    }

    if (character.rotation > character.maxRotation) {
        character.rotation = character.maxRotation;
    }
    if (character.rotation < -character.maxRotation) {
        character.rotation = -character.maxRotation;
    }
}

export function keepOnScreen(character: KinematicCharacter, size: Vector) {
    if (character.position[0] > size[0]) character.position = [0, character.position[1]];
    if (character.position[0] < 0) character.position = [size[0], character.position[1]];
    if (character.position[1] > size[1]) character.position = [character.position[0], 0];
    if (character.position[1] < 0) character.position = [character.position[0], size[1]];
}