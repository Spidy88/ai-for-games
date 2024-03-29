import * as PIXI from 'pixi.js';
import { App, Control, IWatcher } from '../models/app';
import { Character } from '../models/character';
import { Graphic } from '../models/graphic';

export class BaseApp implements App {
    protected _isRunning: boolean = false;
    protected _pixiApp: PIXI.Application | null = null;
    protected _characters: Character[];
    protected _graphics: Graphic[];
    protected _watchers: IWatcher[];
    protected _debugWatchers: IWatcher[];
    protected _controls: Control[];
    protected _scale: number = 0.1;

    constructor() {
        this._characters = [];
        this._graphics = [];
        this._watchers = [];
        this._debugWatchers = [];
        this._controls = [];
    }

    get isRunning() {
        return this._isRunning;
    }

    get controls() {
        return this._controls;
    }

    get watchers() {
        return this._watchers;
    }

    get debugWatchers() {
        return this._debugWatchers;
    }

    play = () => {
        if (this._isRunning) return;
        this._isRunning = true;
    }

    pause = () => {
        if (!this._isRunning) return;
        this._isRunning = false;
    }

    reset() {}

    step = () => {
        this.pause();

        let stepSize = 0.25;
        this.tick(stepSize, true);
    }

    private tick(delta: number, force: boolean = false) {
        if (!this.isRunning && !force) return;
        this.onTick(delta);
    }

    private tickWrapper = (delta: number) => {
        // delta is in ms , but we want calculations to be in seconds
        this.tick(this._pixiApp!.ticker.elapsedMS / 1000);
    }

    protected onTick(deleta: number) {}

    registerPixiApp = (pixiApp: PIXI.Application) => {
        if (this._pixiApp) throw new Error('App is already registered to a PIXI App');
        this._pixiApp = pixiApp;

        for( let graphic of this._graphics) {
            // graphic.scale = pixiApp.screen.width * this._scale;
            pixiApp.stage.addChild(graphic.view);
        }

        for( let character of this._characters) {
            character.size = pixiApp.screen.width * this._scale;
            pixiApp.stage.addChild(character.view);
        }

        this.postRegister(pixiApp);

        this.reset();
        this._pixiApp.ticker.add(this.tickWrapper);
    }

    protected postRegister = (pixiApp: PIXI.Application) => {}

    unregisterPixiApp = () => {
        if (!this._pixiApp) throw new Error('App is not registered to a PIXI App');
        this._pixiApp.ticker.remove(this.tickWrapper);
        this._pixiApp = null;
    }
}
