import { AppClass } from '../models/app';
import {
    WanderApp as KinematicWanderApp
} from '../apps/kinematic/wander-app';
import {
    SeekApp as KinematicSeekApp,
    SeekWithRotationApp as KinematicSeekWithRotationApp
} from '../apps/kinematic/seek-app';
import {
    FleeApp as KinematicFleeApp,
    FleeWithRotationApp as KinematicFleeWithRotationApp
} from '../apps/kinematic/flee-app';
import {
    ArriveApp as KinematicArriveApp,
    ArriveWithRotationApp as KinematicArriveWithRotationApp
} from '../apps/kinematic/arrive-app';
import {
    SeekApp as DynamicSeekApp,
    SeekWithRotationApp as DynamicSeekWithRotationApp
} from '../apps/dynamic/seek-app';
import {
    FleeApp as DynamicFleeApp,
    FleeWithRotationApp as DynamicFleeWithRotationApp
} from '../apps/dynamic/flee-app';
import {
    ArriveApp as DynamicArriveApp,
    ArriveWithRotationApp as DynamicArriveWithRotationApp
} from '../apps/dynamic/arrive-app';
import {
    AlignApp as DynamicAlignApp
} from '../apps/dynamic/align-app';

export type AlgorithmSectionData = {
    title: string;
    details: string;
    App: AppClass;
};
export type AlgorithmData = {
    url: string;
    title: string;
    details: string;
    sections: AlgorithmSectionData[];
};

export const KinematicWander = {
    url: 'kinematic-wander',
    title: 'Wander Algorithm',
    details: 'The wander algorithm moves the character in a random direction, allowing them to wander the map.',
    sections: [{
        title: 'Kinematic version',
        details: `The kinematic wander moves the character in the direction they are facing at 
        max speed while randomly rotating the character somewhere between -maxRotation and 
        +maxRotation. For this specific example, once the character travels off screen, they'll 
        be teleported to the opposite side to keep them in view.`,
        App: KinematicWanderApp
    }]
};

export const KinematicSeek = {
    url: 'kinematic-seek',
    title: 'Seek Algorithm',
    details: `In its simplest form, the seek algorithm moves a character towards its target in a linear fashion.
    No prediction or additional data is considered. Simpy how to get I from my position to my target's position.`,
    sections: [{
        title: 'Kinematic version',
        details: `Direct and at a constant speed. This causes a few interesting visuals. First, the character 
        starts movement abrubtly due to their speed being constantly at max speed. Second, the character struggles 
        to find a final position and "vibrates" at the destination. This is caused by the movement algorithm
        overshooting the destination since its always moving at max speed. Try it out below (you can drag and 
        move the villain).`,
        App: KinematicSeekApp
    }, {
        title: 'Kinematic with rotation',
        details: `Out of curiosity, I altered this algorithm to only allow the character to move in the direction
        they are currently facing. This means the characters rotation must be updated the same way the position is. 
        Just as the final position vibrates, so does the final rotation causing the character to swerve back and 
        forth. Quite funny to watch! They also overshoot their target since they have to turn around the minute 
        they pass the target position.`,
        App: KinematicSeekWithRotationApp
    }]
};

export const KinematicFlee = {
    url: 'kinematic-flee',
    title: 'Flee Algorithm',
    details: 'Flee is the opposite of Seek. Characters will move in the opposite direction of their target.',
    sections: [{
        title: 'Kinematic version',
        details: 'Constant max speed away from target. The exact opposite of Kinematic Flee.',
        App: KinematicFleeApp
    }, {
        title: 'Kinematic with rotation',
        details: `Again, just for the sake of curiosity. What if the agent could only move in the direction 
        they are facing? It would make fleeing much more interesting. Once they hit max flee orientation they 
        can be seen moving in a wave or snake pattern. This is again caused by the overshooting of the desired 
        orientation due to max rotation at each step.`,
        App: KinematicFleeWithRotationApp
    }]
};

export const KinematicArrive = {
    url: 'kinematic-arrive',
    title: 'Arrive Algorithm',
    details: `With Seek, our characters don't consider distance to target. This resulted in our character 
    jittering once it reached it destination because there was no satisfaction criteria for "mission complete". 
    This Arrive algorithm fixes the jittering by introducing a "stop radius", which says stop moving once you 
    are within this radius. It also adds a "time to target" variable that slows the character down as they 
    approach their target to help with overshooting.`,
    sections: [{
        title: 'Kinematic version',
        details: `Calculates the speed we should travel to reach our target in "time to target". This is limited 
        by max speed. As we get closer to our target, this causes the character to slow down more and more as the 
        time to target never changes.`,
        App: KinematicArriveApp
    }, {
        title: 'Kinematic with rotation',
        details: `With rotation this algorithm has had many iterations and interesting visuals. To stay true to 
        the intent of what the book is showing us, the rotation also uses "time to target" to calculate how fast 
        it should rotation, again limited by max rotation. The final effect is quite interesting. I think I'd 
        recommend having two separate time to target variables for distance and orientation.`,
        App: KinematicArriveWithRotationApp
    }]
};

export const DynamicSeek = {
    url: 'dynamic-seek',
    title: 'Seek Algorithm',
    details: `Move directly towards our target but instead of starting at max speed, working our way up to it. 
    This also means changing directions will not be instanteous as our acceleration is being changed rather than
    our velocity.`,
    sections: [{
        title: 'Dynamic version',
        details: `The dynamic version of Seek provides acceleration updates, which in turn modify the velocity. 
        This is significantly different from the kinematic version which updated the velocity directly. We'll see 
        that this results in a more natural acceleration but also causes an issue with deceleration. The 
        algorithm parameters will need to be just right.`,
        App: DynamicSeekApp
    }, {
        title: 'Dynamic with rotation',
        details: `As with our kinematic versions, I wanted to see how enforcing movement to the direction a 
        character is facing would affect the movement. What I didn't expect was this astrocity! The character 
        rotates like they're on ice and the direction of movement never really figuers itself out. We might 
        be able to tweak the algorithm parameters to make this less awful but its pretty bad!`,
        App: DynamicSeekWithRotationApp
    }]
};

export const DynamicFlee = {
    url: 'dynamic-flee',
    title: 'Flee Algorithm',
    details: `The opposite of Seek, our character will attempt to flee from its target. Since the character 
    controls its velocity with acceleration changes, it can be challenging to flee successfully without 
    a good set of algorithm parameters.`,
    sections: [{
        title: 'Dynamic version',
        details: `When the acceleration low and the max speed is high, it takes our character awhile to change 
        directions and adjust to its target. When the acceleration is high and the max speed is lower, the 
        algorithm looks identical to the kinematic version.`,
        App: DynamicFleeApp
    }, {
        title: 'Dynamic with rotation',
        details: `Experimented with rotation again. Still atrocious with the dynamic algorithms.`,
        App: DynamicFleeWithRotationApp
    }]
};

export const DynamicArrive = {
    url: 'dynamic-arrive',
    title: 'Arrive Algorithm',
    details: `The dynamic version of arrive continues to use a stop radius (renamed target radius) 
    and a time to target for calculating acceleration changes. However, it adds another variable 
    to the mix "slow radius". Once the character hits the edge of the slow radius, they begin to 
    slow down. This seems very similar to what "time to target" does, however it uses this target 
    velocity, calculated using slow radius to create an acceleration that will get them to their 
    target velocity. Means we can accelerate in the opposite direction to slow down if we need to 
    slow down.`,
    sections: [{
        title: 'Dynamic version',
        details: `Because the character stops once it hits the stop radius, its hard to visualize 
        this algorithm in its entirety. We don't really see the slow radius come into play. Will 
        need to play around with the parameters and maybe the steering algorithm a bit more.`,
        App: DynamicArriveApp
    }, {
        title: 'Dynamic with rotation',
        details: 'Kept this for the sake of experimentation. Still a shit show',
        App: DynamicArriveWithRotationApp
    }]
};

export const DynamicAlign = {
    url: 'dynamic-align',
    title: 'Align Algorithm',
    details: `This algorithm ignores position and focuses on aligning a rotation to its target. 
    Which isn't to say we are having our AI match its target orientation but instead 
    telling our AI to match its orientation with the orientation of our choice, such as 
    towards our target.`,
    sections: [{
        title: '',
        details: '',
        App: DynamicAlignApp
    }]
};

export const algorithmMap = new Map<string, AlgorithmData>([
    KinematicWander,
    KinematicSeek,
    KinematicFlee,
    KinematicArrive,
    DynamicSeek,
    DynamicFlee,
    DynamicArrive,
    DynamicAlign
].map((entry) => [entry.url, entry]));