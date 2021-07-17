import { Playfield,  } from "../../components/playfield";
import { Controls } from "../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../landing/landing.css";
import { ArriveApp, ArriveWithRotationApp } from "../../apps/arrive-app";
import { useState } from "react";

export function ArriveAlgorithm() {
    const [arriveApp] = useState(() => new ArriveApp());
    const [arriveWithRotationApp] = useState(() => new ArriveWithRotationApp());

    return (
        <>
            <h1>Arrive Algorithm</h1>
            <p>
                With Seek, our characters are always traveling at max speed. 
                This resulted in our character jittering once it reached it destination.
                The Arrive algorithm fixes this jittering by introducing a radius of acceptance 
                for when the character can be considered at the destination.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={arriveApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={arriveApp} />
                </ControlsContainer>
            </div>

            <h3>Arrive Algorithm (with rotation)</h3>
            <p>
                Once we introduce rotation, we notice that not only does our character jitter at its destination, 
                but it also travels in a snakey line as it over rotates due to traveling at max rotation. Once it 
                hits its destination, rather than jittering, it shoots past the target because its unable to turn 
                fast enough and can only move in the direction its facing, slowly rotating to face its target again. 
                The arrive algorithm doesn't solve the issue with traveling like a snake but it should prevent 
                shooting past the target as long as the max rotation is great enough to face the target before the 
                target is reached. We could introduce similar logic as a stop radius for the max rotation as well.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                <PlaygroundContainer>
                    <Playfield app={arriveWithRotationApp} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={arriveWithRotationApp} />
                </ControlsContainer>
            </div>
        </>
    );
}
