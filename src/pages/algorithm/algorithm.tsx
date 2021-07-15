import { Playfield,  } from "../../components/playfield";
import { Controls } from "../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../landing/landing.css";
import { SeekApp, SeekWithRotationApp } from "../../apps/seek-app";
import { useState } from "react";

export function AlgorithmPage() {
    const [seekApp] = useState(() => new SeekApp());
    const [seekWithRotationApp] = useState(() => new SeekWithRotationApp());

    return (
        <>
            <h1>Seek Algorithm</h1>
            <p>
                In its simplest form, the seek algorithm moves a character towards its target in a linear fashion.
                Direct and at a constant speed. This causes a few interesting visuals. First, the character starts 
                movement abrubtly due to their speed being constantly at max speed. Second, the character struggles 
                to find a final position and "vibrates" at the destination. This is caused by the movement algorithm
                overshooting the destination since its always moving at max speed. Try it out below (you can drag and 
                move the villain).
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
        </>
    );
}
