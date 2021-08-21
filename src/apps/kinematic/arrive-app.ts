// import * as PIXI from 'pixi.js';
import { AIvsPlayerApp, Options } from '../ai-vs-player-app';
import { arrive, arriveWithRotation, ArriveOptions } from '../../util/steering';
import { kinematicUpdate, stop } from '../../util/update';
import { ControlType, RangeControl } from '../../models/app';
// import { Graphics } from 'pixi.js';

export class ArriveApp extends AIvsPlayerApp {
    // rotected _stopCircle: Graphics;
    protected _options: ArriveOptions;

    constructor(options: Options = {}) {
        super(options);
        const self = this;

        let stopRadius = ~~(this._villain.size * this._scale * 1.5);
        // this._stopCircle = new Graphics();
        // this._stopCircle.width = this._stopCircle.height = stopRadius;
        // this._stopCircle.lineStyle(2, 0xff0000);
        // this._stopCircle.drawCircle(0, 0, stopRadius);

        this._options = {
            stopRadius,
            timeToTarget: 2
        };

        this._controls.push({
            type: ControlType.Range,
            label: 'Stop Radius',
            min: 0,
            max: 50,
            step: 1,
            get value() {
                return self._options.stopRadius;
            },
            onChange(value: number) {
                self._options.stopRadius = value;
            }
        } as RangeControl, {
            type: ControlType.Range,
            label: 'Time to Target (ms)',
            min: 100,
            max: 5000,
            step: 100,
            get value() {
                return self._options.timeToTarget * 1000;
            },
            onChange(value: number) {
                self._options.timeToTarget = value / 1000;
            }
        } as RangeControl);
    }

    // protected postRegister = (pixiApp: PIXI.Application) => {
    //     pixiApp.stage.addChild(this._stopCircle);
    // }

    // reset = () => {
    //     super.reset();
    //     this._stopCircle.position.x = (this._villain.position[0] - this._stopCircle.width / 2);
    //     this._stopCircle.position.y = (this._villain.position[1] - this._stopCircle.height / 2);
    // }

    onTick = (delta: number) => {
        // update circle position to match villain position (even when paused because of drag interaction)
        // this._stopCircle.position.x = this._villain.position[0];
        // this._stopCircle.position.y = this._villain.position[1];

        let steering = arrive(this._spidy, this._villain, this._options);
        steering
            ? kinematicUpdate(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}

export class ArriveWithRotationApp extends ArriveApp {
    constructor() {
        super({ withRotation: true });

        let stopRadius = this._villain.size * this._scale * 1.5;
        // this._stopCircle = new Graphics();
        // this._stopCircle.width = this._stopCircle.height = stopRadius;
        // this._stopCircle.lineStyle(2, 0xff0000);
        // this._stopCircle.drawCircle(0, 0, stopRadius);

        this._options = {
            stopRadius,
            timeToTarget: 2
        };
    }
    
    onTick = (delta: number) => {
        // update circle position to match villain position (even when paused because of drag interaction)
        // this._stopCircle.position.x = this._villain.position[0];
        // this._stopCircle.position.y = this._villain.position[1];

        let steering = arriveWithRotation(this._spidy, this._villain, this._options);
        // Change update function not steering function
        steering
            ? kinematicUpdate(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}
