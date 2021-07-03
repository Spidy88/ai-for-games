import { Playfield,  } from "../../../components/playfield";
import { Controls } from "../../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../../landing/landing.css";
import { SeekApp, SeekWithRotationApp, SeekOmnidirectionalApp } from "../../../apps/dynamic-seek-app";
import { useState } from "react";

export function SeekAlgorithm() {
    const [seekApp] = useState(() => new SeekApp());
    const [seekWithRotationApp] = useState(() => new SeekWithRotationApp());
    const [seekOmnidirectionalApp] = useState(() => new SeekOmnidirectionalApp());

    return (
        <>
            <h1>Seek Algorithm (Dynamic)</h1>
            <p>
                Previously we saw Seek with a Kinematic algorithm (constant velocity).
                Now we get to see it with a Dynamic algorithm (constant acceleration).
                Using acceleration to move a character gives us the ability to speed up over time,
                as well as change direction in a more natural deacceleration, reacceleration.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={seekApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={seekApp} />
                </ControlsContainer>
            </div>

            <h3>Seek Algorithm (with rotation)</h3>
            <p>
                In the previous algorithm, our character didn't consider rotation. Which means, they could travel 
                in any direction instantly. If their target were to teleport behind them, they would instantly 
                move in that direction without any decelleration or turn radius. This algorithm adds in the concept 
                of rotation. This means the character will have a max rotation setting, only being able to move 
                in their forward direction and turn up to X degrees per second. This brings new interesting visuals 
                such as the inability to reach certain targets when the max rotation is too high.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={seekWithRotationApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={seekWithRotationApp} />
                </ControlsContainer>
            </div>

            <h3>Seek Algorithm (omnidirectional movement)</h3>
            <p>
                Forcing the character to only move forward while also trying to rotate to the correct direction, 
                requires finely tuned parameters. A lot of games provide omni directional movement (side step and back pedal) 
                so I wanted to see what that might look like. In this example, the AI can move in any direction 
                but is still constrainted to their velocity and acceleration. Rotation happens but separately.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={seekOmnidirectionalApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={seekOmnidirectionalApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
