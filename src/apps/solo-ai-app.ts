import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import avatarUrl from '../assets/spidy-avatar.png';

export type Options = {
    aiPosition?: Position;
    withRotation?: boolean;
};

export class SoloAIApp extends BaseApp {
    protected _spidy: Character;
    protected _aiPosition: Position;

    constructor({ aiPosition = Position.TOP_LEFT, withRotation = false }: Options = {}) {
        super();
        this._aiPosition = aiPosition;
        this._spidy = new Character({ avatarUrl, hideRotation: !withRotation });
        this._characters = [this._spidy];
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
