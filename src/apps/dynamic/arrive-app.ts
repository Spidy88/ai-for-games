import { AIvsPlayerApp } from '../ai-vs-player-app';
import { dynamicArrive, dynamicArriveWithRotation } from '../../util/steering';
import { newtonEuler1Update, stop } from '../../util/update';

export class ArriveApp extends AIvsPlayerApp {
    onTick = (delta: number) => {
        let steering = dynamicArrive(this._spidy, this._villain, {
            slowRadius: 50,
            stopRadius: 20,
            timeToTarget: 2
        });

        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}

export class ArriveWithRotationApp extends AIvsPlayerApp {
    constructor() {
        super({ withRotation: true });
    }
    
    onTick = (delta: number) => {
        let steering = dynamicArriveWithRotation(
            this._spidy,
            this._villain,
            {
                slowRadius: 50,
                stopRadius: 20,
                timeToTarget: 2
            }
        );
        
        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}

