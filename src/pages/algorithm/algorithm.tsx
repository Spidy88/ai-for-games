import { useParams } from 'react-router-dom';
import { WanderAlgorithm } from "./wander-algorithm";
import { SeekAlgorithm } from "./seek-algorithm";
import { FleeAlgorithm } from "./flee-algorithm";

const algMap = new Map([
    ['kinematic-wander', WanderAlgorithm],
    ['kinematic-seek', SeekAlgorithm],
    ['kinematic-flee', FleeAlgorithm]
]);

export function AlgorithmPage() {
    let { algorithm } = useParams<{ algorithm: string }>();
    if (!algMap.has(algorithm)) return null;

    const Algorithm = algMap.get(algorithm)!;
    return (
        <Algorithm />
    );
}
