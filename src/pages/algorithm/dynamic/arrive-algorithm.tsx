import { Playfield,  } from "../../../components/playfield";
import { Controls } from "../../../components/controls";
import { PlaygroundContainer, ControlsContainer } from "../../landing/landing.css";
import { ArriveApp, ArriveWithRotationApp } from "../../../apps/dynamic-arrive-app";
import { useState } from "react";

export function ArriveAlgorithm() {
    const [arriveApp] = useState(() => new ArriveApp());
    const [arriveWithRotationApp] = useState(() => new ArriveWithRotationApp());

    return (
        <>
            <h1>Arrive Algorithm (Dynamic)</h1>
            <p>
                The kinematic arrive algorithm introduced a time to target, which 
                caused our AI to slow down as they approached their target, avoiding 
                overshooting. The dynamic version of arrive continues to use this but 
                also adds a new variable for....
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
                Just for fun, watching the algorithm try to work when it can only move forward, 
                while adjusting velocity (through acceleration) and rotation.
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
