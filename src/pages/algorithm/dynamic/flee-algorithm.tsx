import { Playfield,  } from "../../../components/playfield";
import { Controls } from "../../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../../landing/landing.css";
import { FleeApp, FleeWithRotationApp, FleeOmnidirectionalApp } from "../../../apps/dynamic-flee-app";
import { useState } from "react";

export function FleeAlgorithm() {
    const [fleeApp] = useState(() => new FleeApp());
    const [fleeWithRotationApp] = useState(() => new FleeWithRotationApp());
    const [fleeOmnidirectionalApp] = useState(() => new FleeOmnidirectionalApp());

    return (
        <>
            <h1>Flee Algorithm (Dynamic)</h1>
            <p>
                The algorithm is identical to Seek (Dynamic) with steering directing the AI away from 
                the target instead of towards them.
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
                Flee with rotation
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={fleeWithRotationApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={fleeWithRotationApp} />
                </ControlsContainer>
            </div>

            <h3>Flee Algorithm (omnidirectional movement)</h3>
            <p>
                Again, splitting the rotation from the movement.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={fleeOmnidirectionalApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={fleeOmnidirectionalApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
