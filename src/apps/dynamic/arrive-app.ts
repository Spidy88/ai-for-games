import { AIvsPlayerApp, Options } from '../ai-vs-player-app';
import { dynamicArrive, DynamicArriveOptions, dynamicArriveWithRotation } from '../../util/steering';
import { newtonEuler1Update, stop } from '../../util/update';
import { ControlType, RangeControl } from '../../models/app';

export class ArriveApp extends AIvsPlayerApp {
    protected _options: DynamicArriveOptions;

    constructor(init: Options) {
        super(init);
        const self = this;

        this._options = {
            slowRadius: 50,
            stopRadius: 20,
            timeToTarget: 2
        };

        this._controls.push({
            type: ControlType.Range,
            label: 'Max Acceleration',
            min: 0,
            max: 500,
            step: 10,
            get value() {
                return self._spidy.maxAcceleration;
            },
            onChange(value: number) {
                self._spidy.maxAcceleration = value;
            }
        } as RangeControl, {
            type: ControlType.Range,
            label: 'Stop Radius',
            min: 0,
            max: 50,
            step: 1,
            get value() {
                return self._options.stopRadius;
            },
            onChange(value: number) {
                if (value > self._options.slowRadius) value = self._options.slowRadius;
                self._options.stopRadius = value;
            }
        } as RangeControl, {
            type: ControlType.Range,
            label: 'Slow Radius',
            min: 0,
            max: 50,
            step: 1,
            get value() {
                return self._options.slowRadius;
            },
            onChange(value: number) {
                if (value < self._options.stopRadius) value = self._options.stopRadius;
                self._options.slowRadius = value;
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

    onTick = (delta: number) => {
        let steering = dynamicArrive(this._spidy, this._villain, this._options);

        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}

export class ArriveWithRotationApp extends ArriveApp {
    constructor() {
        super({ withRotation: true });
        const self = this;

        const maxAccelIndex = 1 + this._controls.findIndex(
            (control) => control.label === 'Max Acceleration'
        );
        this._controls.splice(maxAccelIndex, 0, {
            type: ControlType.Range,
            label: 'Max Angular Acceleration',
            min: 0,
            max: 100,
            step: 1,
            get value() {
                return self._spidy.maxAngularAcceleration;
            },
            onChange(value: number) {
                self._spidy.maxAngularAcceleration = value;
            }
        } as RangeControl);
    }
    
    onTick = (delta: number) => {
        let steering = dynamicArriveWithRotation(
            this._spidy,
            this._villain,
            this._options
        );
        
        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}

