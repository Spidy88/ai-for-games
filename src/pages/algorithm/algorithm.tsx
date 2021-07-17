import { useParams } from 'react-router-dom';
import { WanderAlgorithm } from "./kinematic/wander-algorithm";
import { SeekAlgorithm } from "./kinematic/seek-algorithm";
import { FleeAlgorithm } from "./kinematic/flee-algorithm";
import { ArriveAlgorithm } from "./kinematic/arrive-algorithm";

const algMap = new Map([
    ['kinematic-wander', WanderAlgorithm],
    ['kinematic-seek', SeekAlgorithm],
    ['kinematic-flee', FleeAlgorithm],
    ['kinematic-arrive', ArriveAlgorithm]
]);

export function AlgorithmPage() {
    let { algorithm } = useParams<{ algorithm: string }>();
    if (!algMap.has(algorithm)) return null;

    const Algorithm = algMap.get(algorithm)!;
    return (
        <Algorithm />
    );
}
