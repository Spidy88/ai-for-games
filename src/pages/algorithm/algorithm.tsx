import { Playfield,  } from "../../components/playfield";
import { Controls } from "../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../landing/landing.css";
import { SeekApp } from "../../apps/seek-app";
import { useState } from "react";

export function AlgorithmPage() {
    const [seekApp] = useState(() => new SeekApp());

    return (
        <>
            <h1>Seek Algorithm</h1>
            <p>
                In its simplest form, the seek algorithm moves one character towards its target in a linear fashion.
                Direct and at a constant speed
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={seekApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={seekApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
