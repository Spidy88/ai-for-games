import { AIvsPlayerApp } from '../ai-vs-player-app';
import { seek, seekWithRotation } from "../../util/steering";
import { kinematicUpdate } from "../../util/update";

export class SeekApp extends AIvsPlayerApp {
    onTick = (delta: number) => {
        let steering = seek(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
    }
}

export class SeekWithRotationApp extends AIvsPlayerApp {
    constructor() {
        super({ withRotation: true });
    }

    onTick = (delta: number) => {
        let steering = seekWithRotation(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
    }
}
