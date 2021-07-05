import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import { wander } from "../util/steering";
import { directUpdate, keepOnScreen } from "../util/update";
import avatarUrl from '../assets/spidy-avatar.png';

export class WanderApp extends BaseApp {
    private _spidy: Character;

    constructor() {
        super();
        this._spidy = new Character({ avatarUrl });
        this._characters = [this._spidy];
    }

    reset = () => {
        this._spidy.setPosition(0, 0, Position.TOP_LEFT);
        this._spidy.orientation = 0;
    }

    tick = (delta: number, force: boolean = false) => {
        if (!this.isRunning && !force) return;

        let steering = wander(this._spidy);
        directUpdate(delta, steering, this._spidy);
        keepOnScreen(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height])
    }
}
