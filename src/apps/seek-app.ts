import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import { seek } from "../util/steering";
import { kinematicUpdate } from "../util/update";
import spidyAvatarUrl from '../assets/spidy-avatar.png';
import villainAvatarUrl from '../assets/villain-avatar.png';

export class SeekApp extends BaseApp {
    private _spidy: Character;
    private _villain: Character;

    constructor() {
        super();
        this._spidy = new Character({ avatarUrl: spidyAvatarUrl, hideRotation: true });
        this._villain = new Character({ avatarUrl: villainAvatarUrl, hideRotation: true });
        this.makeInteractable(this._villain);
        this._characters = [this._spidy, this._villain];
    }

    reset = () => {
        this._spidy.setPosition(0, 0, Position.TOP_LEFT);
        this._spidy.orientation = 0;
        this._villain.setPosition(this._pixiApp?.screen.width ?? 0, this._pixiApp?.screen.height ?? 0, Position.BOTTOM_RIGHT);
        this._villain.orientation = 180;
    }

    tick = (delta: number, force: boolean = false) => {
        if (!this.isRunning && !force) return;

        let steering = seek(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
    }
}
