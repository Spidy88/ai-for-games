import { AIvsPlayerApp } from './ai-vs-player-app';
import { dynamicSeek, dynamicSeekOmnidirectional, dynamicSeekWithRotation } from "../util/steering";
import { newtonEuler1Update } from "../util/update";

export class SeekApp extends AIvsPlayerApp {
    onTick = (delta: number) => {
        let steering = dynamicSeek(this._spidy, this._villain);
        newtonEuler1Update(delta, steering, this._spidy);
    }
}

export class SeekWithRotationApp extends AIvsPlayerApp {
    constructor() {
        super({ withRotation: true });
    }
    
    onTick = (delta: number) => {
        let steering = dynamicSeekWithRotation(this._spidy, this._villain);
        newtonEuler1Update(delta, steering, this._spidy);
    }
}

export class SeekOmnidirectionalApp extends AIvsPlayerApp {    
    onTick = (delta: number) => {
        let steering = dynamicSeekOmnidirectional(this._spidy, this._villain);
        newtonEuler1Update(delta, steering, this._spidy);
    }
}
