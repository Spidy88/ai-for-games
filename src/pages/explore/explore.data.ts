export const KinematicWander = {
    url: 'kinematic-wander',
    title: 'Wander',
    details: 'A simple algorithm that moves a character around the playfield at max speed. No destination is set and their orientation is given a chance to update each frame.',
    code: `velocity = maxSpeed * orientationAsNormalizedVector;
rotation = maxRotation * randomBinomial(); // [-maxRotation, maxRotation]`
};

export const KinematicSeek = {
    url: 'kinematic-seek',
    title: 'Seek',
    details: 'A simple algorithm for seeking after a target. The character remains at a constant max velocity with no additional logic around speeding up from a stopped position, or slowing down once a destination becomes increasingly closer.',
    code: ''
};

export const KinematicFlee = {
    url: 'kinematic-flee',
    title: 'Flee',
    details: 'A simple algorithm for fleeing from a target. The character remains at a constant max velocity with no additional logic around speeding up from a stopped position, or slowing down once a destination becomes increasingly closer.',
    code: ''
};

export const KinematicArrive = {
    url: 'kinematic-arrive',
    title: 'Arrive',
    details: 'A simple algorithm for seeking after a target. The character remains at a constant max velocity with no additional logic around speeding up from a stopped position, or slowing down once a destination becomes increasingly closer.',
    code: ''
};

export const DynamicSeek = {
    url: 'dynamic-seek',
    title: 'Seek',
    details: 'An algorithm for dynamically seeking a target using acceleration to adjust velocity instead of a constant velocity.',
    code: ''
};

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
        DynamicSeek
    ]
};

export const Data = {
    sections: [
        KinematicSection,
        DynamicSection
    ]
};

export default Data;
