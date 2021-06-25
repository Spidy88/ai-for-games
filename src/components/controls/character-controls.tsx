import { useEffect, useRef } from "react";
import round from "lodash/round";
import { length, vectorAsOrientation } from "../../util/vectors";
import { Character } from '../../models/character';

export type CharacterControlsProps = {
    character: Character;
};

export function CharacterControls(props: CharacterControlsProps) {
    const { character } = props;
    const controlsRef = useRef<HTMLDivElement>(null);

    const updateMaxSpeed = (e: React.FormEvent<HTMLInputElement>) => {
        let newMaxSpeed = parseInt(e.currentTarget.value);
        if (isNaN(newMaxSpeed)) return;
        character.maxSpeed = newMaxSpeed;
    };

    const updateMaxRotation = (e: React.FormEvent<HTMLInputElement>) => {
        let newMaxRotation = parseInt(e.currentTarget.value);
        if (isNaN(newMaxRotation)) return;
        character.maxRotation = newMaxRotation;
    };

    useEffect(() => {
        let isMounted = true;

        const velocityDOM = controlsRef.current!.getElementsByClassName('velocity')[0]!;
        const directionDOM = controlsRef.current!.getElementsByClassName('direction')[0]!;
        const orientationDOM = controlsRef.current!.getElementsByClassName('orientation')[0]!;
        const maxSpeedDOM = controlsRef.current!.getElementsByClassName('maxSpeed')[0]! as HTMLInputElement;
        const maxRotationDOM = controlsRef.current!.getElementsByClassName('maxRotation')[0]! as HTMLInputElement;

        function updateText() {
            if (!isMounted) return;

            const velocity = `${round(length(character.velocity), 2)} - (${round(character.velocity[0], 2)}, ${round(character.velocity[1], 2)})`;
            const direction = round(vectorAsOrientation(character.velocity), 1);
            const orientation = round(character.orientation, 1);

            velocityDOM.textContent = velocity;
            directionDOM.textContent = String(direction);
            orientationDOM.textContent = String(orientation);
            maxSpeedDOM.value = String(character.maxSpeed);
            maxRotationDOM.value = String(character.maxRotation);

            requestAnimationFrame(updateText);
        }

        updateText();

        return () => {
            isMounted = false;
        }
    }, [character]);

    return (
        <div ref={controlsRef}>
            <label>Velocity</label>
            <div className="velocity">0 - (0, 0)</div>

            <label>Velocity direction</label>
            <div className="direction">0</div>

            <label>Orientation</label>
            <div className="orientation">0</div>

            <div>
                <label>Max speed</label>
                <input className="maxSpeed" type="number" min="0" max="50" onChange={updateMaxSpeed} />
            </div>

            <div>
                <label>Max rotation</label>
                <input className="maxRotation" type="number" min="0" max="50" onChange={updateMaxRotation} />
            </div>
        </div>
    );
}
