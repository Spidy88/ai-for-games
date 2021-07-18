import * as PIXI from 'pixi.js';
import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import { arrive, arriveWithRotation, ArriveOptions } from "../util/steering";
import { kinematicUpdate, clampKinematics } from "../util/update";
import spidyAvatarUrl from '../assets/spidy-avatar.png';
import villainAvatarUrl from '../assets/villain-avatar.png';
import { Graphics } from 'pixi.js';

export class ArriveApp extends BaseApp {
    protected _spidy: Character;
    protected _villain: Character;
    protected _stopCircle: Graphics;
    protected _options: ArriveOptions;

    constructor() {
        super();
        this._spidy = new Character({ avatarUrl: spidyAvatarUrl, hideRotation: true });
        this._villain = new Character({ avatarUrl: villainAvatarUrl, hideRotation: true });
        this.makeInteractable(this._villain);
        this._characters = [this._spidy, this._villain];

        let stopRadius = this._villain.size * this._scale * 1.5;
        this._stopCircle = new Graphics();
        this._stopCircle.width = this._stopCircle.height = stopRadius;
        this._stopCircle.lineStyle(2, 0xff0000);
        this._stopCircle.drawCircle(0, 0, stopRadius);

        this._options = {
            stopRadius,
            timeToTarget: 2
        };
    }

    protected postRegister = (pixiApp: PIXI.Application) => {
        pixiApp.stage.addChild(this._stopCircle);
    }

    reset = () => {
        this._spidy.setPosition(0, 0, Position.TOP_LEFT);
        this._spidy.orientation = 0;
        this._spidy.velocity = [0, 0];
        this._spidy.rotation = 0;
        this._villain.setPosition(this._pixiApp?.screen.width ?? 0, this._pixiApp?.screen.height ?? 0, Position.BOTTOM_RIGHT);
        this._villain.orientation = 180;
        this._villain.velocity = [0, 0];
        this._villain.rotation = 0;
        this._stopCircle.position.x = (this._villain.position[0] - this._stopCircle.width / 2);
        this._stopCircle.position.y = (this._villain.position[1] - this._stopCircle.height / 2);
        // TODO: Stop circle radius?
    }

    tick = (delta: number, force: boolean = false) => {
        // update circle position to match villain position (even when paused because of drag interaction)
        this._stopCircle.position.x = this._villain.position[0];
        this._stopCircle.position.y = this._villain.position[1];

        if (!this.isRunning && !force) return;

        let steering = arrive(this._spidy, this._villain, this._options);
        kinematicUpdate(delta, steering, this._spidy);
        clampKinematics(this._spidy);
    }
}

export class ArriveWithRotationApp extends ArriveApp {
    constructor() {
        super();
        this._spidy = new Character({ avatarUrl: spidyAvatarUrl });
        this._villain = new Character({ avatarUrl: villainAvatarUrl });
        this.makeInteractable(this._villain);
        this._characters = [this._spidy, this._villain];

        let stopRadius = this._villain.size * this._scale * 1.5;
        this._stopCircle = new Graphics();
        this._stopCircle.width = this._stopCircle.height = stopRadius;
        this._stopCircle.lineStyle(2, 0xff0000);
        this._stopCircle.drawCircle(0, 0, stopRadius);

        this._options = {
            stopRadius,
            timeToTarget: 2
        };
    }
    
    tick = (delta: number, force: boolean = false) => {
        // update circle position to match villain position (even when paused because of drag interaction)
        this._stopCircle.position.x = this._villain.position[0];
        this._stopCircle.position.y = this._villain.position[1];

        if (!this.isRunning && !force) return;

        let steering = arriveWithRotation(this._spidy, this._villain, this._options);
        // Change update function not steering function
        kinematicUpdate(delta, steering, this._spidy);
        clampKinematics(this._spidy);
    }
}
