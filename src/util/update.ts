import { Steering, KinematicCharacter, Vector } from "../types";
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

    character.velocity = mult(steering.linear, delta);
    character.rotation += steering.angular * delta;
}

export function newtonEuler1Update(delta: number, steering: Steering, character: KinematicCharacter) {
    character.position = add(
        character.position,
        mult(character.velocity, delta)
    );
    character.orientation += character.rotation * delta;

    character.velocity = mult(steering.linear, delta);
    character.rotation += steering.angular * delta;
}

export function directUpdate(delta: number, steering: Steering, character: KinematicCharacter) {
    character.position = add(character.position, mult(character.velocity, delta));
    character.orientation += steering.angular * delta;

    character.velocity = steering.linear;
    character.rotation = character.orientation;

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

export function kinematicUpdate(delta: number, steering: Steering, character: KinematicCharacter) {
    character.position = add(character.position, mult(character.velocity, delta));
    character.orientation += character.rotation * delta;

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