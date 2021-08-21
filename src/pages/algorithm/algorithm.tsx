import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Playfield } from '../../components/playfield';
import { Controls } from '../../components/controls';
import { algorithmMap, AlgorithmSectionData } from '../../data/algorithms.data';
import { MainGrid, PlaygroundContainer, ControlsContainer } from './algorithm.css';

export function AlgorithmPage() {
    let { algorithm } = useParams<{ algorithm: string }>();
    if (!algorithmMap.has(algorithm)) return null;

    const algorithmData = algorithmMap.get(algorithm)!;
    return (
        <>
            <h1>{algorithmData.title}</h1>
            <p>
                {algorithmData.details}
            </p>

            {algorithmData.sections.map((section, i) => (
                <AlgorithmSection key={i} data={section} />
            ))}
        </>
    );
}

export type AlgorithmSectionProps = {
    data: AlgorithmSectionData;
};
export function AlgorithmSection(props: AlgorithmSectionProps) {
    const { data } = props;
    const [app] = useState(() => new data.App());

    return (
        <>
            <h3>{data.title}</h3>
            <p>{data.details}</p>
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

