import { Playfield,  } from "../../../components/playfield";
import { Controls } from "../../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../../landing/landing.css";
import { WanderApp } from "../../../apps/wander-app";
import { useState } from "react";

export function WanderAlgorithm() {
    const [wanderApp] = useState(() => new WanderApp());

    return (
        <>
            <h1>Wander Algorithm</h1>
            <p>
                The kinematic wander moves the character in the direction they are facing at max speed while randomly rotating
                the character somewhere between -maxRotation and +maxRotation. For this specific example, once the character 
                travels off screen, they'll be teleported to the opposite side to keep them in view.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={wanderApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={wanderApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
