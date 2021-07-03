import { AIvsPlayerApp } from './ai-vs-player-app';
import { Position } from '../models/character';
import { flee, fleeWithRotation } from "../util/steering";
import { kinematicUpdate, keepOnScreenWithBlock } from "../util/update";

export class FleeApp extends AIvsPlayerApp {
    constructor() {
        super({ aiPosition: Position.CENTER });
    }

    onTick = (delta: number) => {
        let steering = flee(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}

export class FleeWithRotationApp extends AIvsPlayerApp {
    constructor() {
        super({ aiPosition: Position.CENTER, withRotation: true });
    }
    
    onTick = (delta: number, force: boolean = false) => {
        let steering = fleeWithRotation(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}
