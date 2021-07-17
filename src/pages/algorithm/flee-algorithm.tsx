import { Playfield,  } from "../../components/playfield";
import { Controls } from "../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../landing/landing.css";
import { FleeApp, FleeWithRotationApp } from "../../apps/flee-app";
import { useState } from "react";

export function FleeAlgorithm() {
    const [fleeApp] = useState(() => new FleeApp());
    const [fleeWithRotationApp] = useState(() => new FleeWithRotationApp());

    return (
        <>
            <h1>Flee Algorithm</h1>
            <p>
                Flee is the opposite of Seek. Characters will move in the opposite direction of their target.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={fleeApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={fleeApp} />
                </ControlsContainer>
            </div>

            <h3>Flee Algorithm (with rotation)</h3>
            <p>
                Similar to how Seek had two versions of the algorithm, Flee can also come in a rotation or non-rotation version.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={fleeWithRotationApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={fleeWithRotationApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
