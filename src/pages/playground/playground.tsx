import { useState } from 'react';
import { FlightApp } from '../../apps/playground/flight-app';
import { Controls } from '../../components/controls';
import { Playfield } from '../../components/playfield';
import { ControlsContainer, MainGrid, PlaygroundContainer } from '../algorithm/algorithm.css';

export function PlaygroundPage() {
    const [app] = useState(() => new FlightApp());
    return (
        <>
            <h1>Playground - 2D Flight</h1>
            <p>
                Playing around with gravity and flight in a 2D setting that we can eventually adapt to 3D.
            </p>
            <MainGrid>
                <PlaygroundContainer>
                    <Playfield app={app} />
                </PlaygroundContainer>

                <ControlsContainer>
                    <Controls app={app} />
                </ControlsContainer>
            </MainGrid>
        </>
    );
}
