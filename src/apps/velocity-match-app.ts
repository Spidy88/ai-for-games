import { AIvsPlayerApp } from './ai-vs-player-app';
import { dynamicVelocityMatch } from "../util/steering";
import { newtonEuler1Update, stop } from "../util/update";

export class VelocityMatchApp extends AIvsPlayerApp {
    onTick = (delta: number) => {
        let steering = dynamicVelocityMatch(this._spidy, this._villain);
        
        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}
