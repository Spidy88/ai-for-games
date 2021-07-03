import { Playfield,  } from "../../../components/playfield";
import { Controls } from "../../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../../landing/landing.css";
import { AlignApp } from "../../../apps/dynamic-align-app";
import { useState } from "react";

export function AlignAlgorithm() {
    const [alignApp] = useState(() => new AlignApp());

    return (
        <>
            <h1>Align Algorithm (Dynamic)</h1>
            <p>
                This algorithm ignores position and focuses on aligning a rotation to its target. 
                Which isn't to say we are having our AI match its target orientation but instead 
                telling our AI to match its orientation with the orientation of our choice, such as 
                towards our target.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={alignApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={alignApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
