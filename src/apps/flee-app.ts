import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import { flee, fleeWithRotation } from "../util/steering";
import { kinematicUpdate, clampKinematics, keepOnScreenWithBlock } from "../util/update";
import spidyAvatarUrl from '../assets/images/spidy-avatar.png';
import villainAvatarUrl from '../assets/images/villain-avatar.png';

export class FleeApp extends BaseApp {
    protected _spidy: Character;
    protected _villain: Character;

    constructor() {
        super();
        this._spidy = new Character({ avatarUrl: spidyAvatarUrl, hideRotation: true });
        this._villain = new Character({ avatarUrl: villainAvatarUrl, hideRotation: true });
        this.makeInteractable(this._villain);
        this._characters = [this._spidy, this._villain];
    }

    reset = () => {
        this._spidy.setPosition((this._pixiApp?.screen.width ?? 0) / 2, (this._pixiApp?.screen.height ?? 0) / 2, Position.CENTER);
        this._spidy.orientation = 0;
        this._spidy.velocity = [0, 0];
        this._spidy.rotation = 0;
        this._villain.setPosition(this._pixiApp?.screen.width ?? 0, this._pixiApp?.screen.height ?? 0, Position.BOTTOM_RIGHT);
        this._villain.orientation = 180;
        this._villain.velocity = [0, 0];
        this._villain.rotation = 0;
    }

    tick = (delta: number, force: boolean = false) => {
        if (!this.isRunning && !force) return;

        let steering = flee(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}

export class FleeWithRotationApp extends FleeApp {
    constructor() {
        super();
        this._spidy = new Character({ avatarUrl: spidyAvatarUrl });
        this._villain = new Character({ avatarUrl: villainAvatarUrl });
        this.makeInteractable(this._villain);
        this._characters = [this._spidy, this._villain];
    }
    
    tick = (delta: number, force: boolean = false) => {
        if (!this.isRunning && !force) return;

        let steering = fleeWithRotation(this._spidy, this._villain);
        kinematicUpdate(delta, steering, this._spidy);
        clampKinematics(this._spidy);
        keepOnScreenWithBlock(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height], this._spidy.size * 0.75);
    }
}
