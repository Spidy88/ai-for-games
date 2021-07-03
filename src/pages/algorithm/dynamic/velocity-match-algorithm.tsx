import { Playfield,  } from "../../../components/playfield";
import { Controls } from "../../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../../landing/landing.css";
import { VelocityMatchApp } from "../../../apps/velocity-match-app";
import { useState } from "react";

export function VelocityMatchAlgorithm() {
    const [velocityMatchApp] = useState(() => new VelocityMatchApp());

    return (
        <>
            <h1>Velocity Match Algorithm (Dynamic)</h1>
            <p>
                
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={velocityMatchApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={velocityMatchApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
