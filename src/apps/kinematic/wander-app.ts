import { SoloAIApp } from '../solo-ai-app';
import { wander } from "../../util/steering";
import { kinematicUpdate, keepOnScreenWithSeamless } from "../../util/update";

export class WanderApp extends SoloAIApp {
    onTick = (delta: number) => {
        let steering = wander(this._spidy);
        kinematicUpdate(delta, steering, this._spidy);
        keepOnScreenWithSeamless(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height]);
    }
}
