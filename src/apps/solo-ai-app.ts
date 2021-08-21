import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import avatarUrl from '../assets/spidy-avatar.png';
import { ControlType, RangeControl } from '../models/app';

export type Options = {
    aiPosition?: Position;
    withRotation?: boolean;
};

export class SoloAIApp extends BaseApp {
    protected _spidy: Character;
    protected _aiPosition: Position;

    constructor({ aiPosition = Position.TOP_LEFT, withRotation = false }: Options = {}) {
        super();
        const self = this;

        this._aiPosition = aiPosition;
        this._spidy = new Character({ avatarUrl, hideRotation: !withRotation });
        this._characters = [this._spidy];
        this._watchers = [{
            label: 'Position',
            get value() {
                let formattedVelocity = self._spidy.position
                    .map((v) => ~~v)
                    .join(', ');
                return `(${formattedVelocity})`;
            },
        }, {
            label: 'Orientation',
            get value() {
                return String(~~self._spidy.orientation);
            }
        }, {
            label: 'Speed',
            get value() {
                return String(~~self._spidy.speed);
            }
        }, {
            label: 'Rotation',
            get value() {
                return String(~~self._spidy.rotation);
            }
        }];
        this._debugWatchers = [{
            label: 'Velocity',
            get value() {
                let formattedVelocity = self._spidy.velocity
                    .map((v) => ~~v)
                    .join(', ');
                return `(${formattedVelocity})`;
            },
        }];
        this._controls = [{
            type: ControlType.Range,
            label: 'Max Speed',
            min: 0,
            max: 500,
            step: 10,
            get value() {
                return self._spidy.maxSpeed;
            },
            onChange(value: number) {
                self._spidy.maxSpeed = Math.max(0, value);
            }
        } as RangeControl, {
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
        } as RangeControl];
    }

    protected calculateAIPosition() {
        let x = 0;
        let y = 0;

        if ([Position.TOP, Position.CENTER, Position.BOTTOM].includes(this._aiPosition)) {
            x = (this._pixiApp?.screen.width ?? 0) / 2;
        }
        else if([Position.TOP_RIGHT, Position.RIGHT, Position.BOTTOM_RIGHT].includes(this._aiPosition)) {
            x = (this._pixiApp?.screen.width ?? 0);
        }

        if ([Position.LEFT, Position.CENTER, Position.RIGHT].includes(this._aiPosition)) {
            y = (this._pixiApp?.screen.height ?? 0) / 2;
        }
        else if ([Position.BOTTOM_LEFT, Position.BOTTOM, Position.BOTTOM_RIGHT].includes(this._aiPosition)) {
            y = (this._pixiApp?.screen.height ?? 0);
        }
        
        return { x, y };
    }

    reset = () => {
        let { x: aiX, y: aiY } = this.calculateAIPosition();
        this._spidy.setPosition(aiX, aiY, this._aiPosition);
        this._spidy.orientation = 0;
        this._spidy.velocity = [0, 0];
        this._spidy.rotation = 0;
    }
}
