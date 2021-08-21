import { AIvsPlayerApp } from '../ai-vs-player-app';
import { Position } from '../../models/character';
import { dynamicAlign, DynamicAlignOptions } from '../../util/steering';
import { newtonEuler1Update, stop } from '../../util/update';
import { RangeControl, ControlType } from '../../models/app';

export class AlignApp extends AIvsPlayerApp {
    protected _options: DynamicAlignOptions;

    constructor() {
        super({ aiPosition: Position.CENTER, withRotation: true });
        const self = this;

        this._options = {
            timeToTarget: 1,
            slowDelta: 30,
            stopDelta: 5
        };

        this._controls = [{
            type: ControlType.Range,
            label: 'Max rotation',
            min: 0,
            max: 360,
            step: 1,
            get value() {
                return self._spidy.maxRotation;
            },
            onChange(value: number) {
                self._spidy.maxRotation = Math.max(0, value);
            }
        } as RangeControl, {
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
        } as RangeControl, {
            type: ControlType.Range,
            label: 'Stop Delta',
            min: 0,
            max: 50,
            step: 1,
            get value() {
                return self._options.stopDelta;
            },
            onChange(value: number) {
                if (value > self._options.slowDelta) value = self._options.slowDelta;
                self._options.stopDelta = value;
            }
        } as RangeControl, {
            type: ControlType.Range,
            label: 'Slow Delta',
            min: 0,
            max: 100,
            step: 1,
            get value() {
                return self._options.slowDelta;
            },
            onChange(value: number) {
                if (value < self._options.stopDelta) value = self._options.stopDelta;
                self._options.slowDelta = value;
            }
        } as RangeControl, {
            type: ControlType.Range,
            label: 'Time to Target (ms)',
            min: 100,
            max: 3000,
            step: 100,
            get value() {
                return self._options.timeToTarget * 1000;
            },
            onChange(value: number) {
                self._options.timeToTarget = value / 1000;
            }
        } as RangeControl];
    }

    onTick = (delta: number) => {
        let steering = dynamicAlign(this._spidy, this._villain, this._options);
        
        steering
            ? newtonEuler1Update(delta, steering, this._spidy)
            : stop(this._spidy);
    }
}
