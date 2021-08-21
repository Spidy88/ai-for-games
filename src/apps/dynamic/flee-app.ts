import { AIvsPlayerApp } from '../ai-vs-player-app';
import { Position } from '../../models/character';
import { dynamicFlee, dynamicFleeOmnidirectional, dynamicFleeWithRotation } from "../../util/steering";
import { newtonEuler1Update, keepOnScreenWithBlock } from "../../util/update";

export class FleeApp extends AIvsPlayerApp {
    constructor() {
        super({ aiPosition: Position.CENTER });
    }
    
    onTick = (delta: number) => {
        let steering = dynamicFlee(this._spidy, this._villain);
        newtonEuler1Update(delta, steering, this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}

export class FleeWithRotationApp extends AIvsPlayerApp {
    constructor() {
        super({ aiPosition: Position.CENTER, withRotation: true });
    }
    
    onTick = (delta: number) => {
        let steering = dynamicFleeWithRotation(this._spidy, this._villain);
        newtonEuler1Update(delta, steering, this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}

export class FleeOmnidirectionalApp extends AIvsPlayerApp {
    constructor() {
        super({ aiPosition: Position.CENTER });
    }

    onTick = (delta: number) => {
        let steering = dynamicFleeOmnidirectional(this._spidy, this._villain);
        newtonEuler1Update(delta, steering, this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}
