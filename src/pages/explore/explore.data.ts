import {
    KinematicWander,
    KinematicSeek,
    KinematicFlee,
    KinematicArrive,
    DynamicSeek,
    DynamicFlee,
    DynamicArrive,
    DynamicAlign
} from '../../data/algorithms.data';

export const KinematicSection = {
    title: 'Kinematic',
    articles: [
        KinematicWander,
        KinematicSeek,
        KinematicFlee,
        KinematicArrive
    ]
};

export const DynamicSection = {
    title: 'Dynamic',
    articles: [
        DynamicSeek,
        DynamicFlee,
        DynamicArrive,
        DynamicAlign,
        DynamicAlign,
        DynamicAlign
    ]
};

export const Data = {
    sections: [
        KinematicSection,
        DynamicSection
    ]
};

export default Data;
