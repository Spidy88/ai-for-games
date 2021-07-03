import { AIvsPlayerApp } from './ai-vs-player-app';
import { Position } from '../models/character';
import { dynamicAlign } from "../util/steering";
import { newtonEuler1Update, stop } from "../util/update";

export class AlignApp extends AIvsPlayerApp {
    constructor() {
        super({ aiPosition: Position.CENTER, withRotation: true });
    }

    onTick = (delta: number) => {
        let steering = dynamicAlign(this._spidy, this._villain);
        
        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}
