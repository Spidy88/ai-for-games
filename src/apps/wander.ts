import * as PIXI from 'pixi.js';
import { App } from "../models/app";
import { Character } from '../models/character';
import { wander } from "../util/steering";
import { directUpdate, keepOnScreen } from "../util/update";
import avatarUrl from '../assets/spidy-avatar.png';

export class WanderApp implements App {
    private _isRunning: boolean = false;
    private _pixiApp: PIXI.Application | null = null;
    private _spidy: Character;
    private _characters: Character[];

    constructor() {
        this._spidy = new Character({ avatarUrl });
        this._characters = [this._spidy];
    }

    get isRunning() {
        return this._isRunning;
    }

    get characters() {
        return this._characters;
    }

    play = () => {
        if (this._isRunning) return;
        this._isRunning = true;
    }

    pause = () => {
        if (!this._isRunning) return;
        this._isRunning = false;
    }

    reset = () => {
        this._spidy.position = [0, 0];
    }

    step = () => {
        this.pause();

        let stepSize = 1;
        this.tick(stepSize, true);
    }

    tick = (delta: number, force: boolean = false) => {
        if (!this.isRunning && !force) return;

        let steering = wander(this._spidy);
        directUpdate(delta, steering, this._spidy);
        keepOnScreen(this._spidy, [this._pixiApp!.screen.width, this._pixiApp!.screen.height])
    }

    registerPixiApp = (pixiApp: PIXI.Application) => {
        if (this._pixiApp) throw new Error('App is already registered to a PIXI App');
        this.reset();
        this._pixiApp = pixiApp;

        for( let character of this._characters) {
            character.size = pixiApp.screen.width / 10;
            pixiApp.stage.addChild(character.view);
        }

        this._pixiApp.ticker.add(this.tick);
    }

    unregisterPixiApp = () => {
        if (!this._pixiApp) throw new Error('App is not registered to a PIXI App');
        this._pixiApp.ticker.remove(this.tick);
        this._pixiApp = null;
    }
}
