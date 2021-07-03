import { useParams } from 'react-router-dom';
import { WanderAlgorithm } from "./kinematic/wander-algorithm";
import { SeekAlgorithm } from "./kinematic/seek-algorithm";
import { FleeAlgorithm } from "./kinematic/flee-algorithm";
import { ArriveAlgorithm } from "./kinematic/arrive-algorithm";
import { SeekAlgorithm as DynamicSeekAlgorithm } from "./dynamic/seek-algorithm";
import { FleeAlgorithm as DynamicFleeAlgorithm } from "./dynamic/flee-algorithm";
import { ArriveAlgorithm as DynamicArriveAlgorithm } from "./dynamic/arrive-algorithm";
import { AlignAlgorithm as DynamicAlignAlgorithm } from "./dynamic/align-algorithm";

const algMap = new Map([
    ['kinematic-wander', WanderAlgorithm],
    ['kinematic-seek', SeekAlgorithm],
    ['kinematic-flee', FleeAlgorithm],
    ['kinematic-arrive', ArriveAlgorithm],
    ['dynamic-seek', DynamicSeekAlgorithm],
    ['dynamic-flee', DynamicFleeAlgorithm],
    ['dynamic-arrive', DynamicArriveAlgorithm],
    ['dynamic-align', DynamicAlignAlgorithm]
]);

export function AlgorithmPage() {
    let { algorithm } = useParams<{ algorithm: string }>();
    if (!algMap.has(algorithm)) return null;

    const Algorithm = algMap.get(algorithm)!;
    return (
        <Algorithm />
    );
}
