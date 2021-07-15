import * as PIXI from 'pixi.js';
import { App } from "../models/app";
import { Character, Position } from '../models/character';

type MouseDragEvent = PIXI.InteractionEvent & {
    isDragging: boolean;
};

export class BaseApp implements App {
    protected _isRunning: boolean = false;
    protected _pixiApp: PIXI.Application | null = null;
    protected _characters: Character[];

    constructor() {
        this._characters = [];
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

    reset() {}

    step = () => {
        this.pause();

        let stepSize = 0.25;
        this.tick(stepSize, true);
    }

    protected tick(delta: number, force: boolean = false) {}
    private tickWrapper = (delta: number) => {
        // delta is in ms , but we want calculations to be in seconds
        //this.tick(delta);
        this.tick(this._pixiApp!.ticker.elapsedMS / 1000);
    }

    registerPixiApp = (pixiApp: PIXI.Application) => {
        if (this._pixiApp) throw new Error('App is already registered to a PIXI App');
        this._pixiApp = pixiApp;

        for( let character of this._characters) {
            character.size = pixiApp.screen.width / 10;
            pixiApp.stage.addChild(character.view);
        }

        this.reset();
        this._pixiApp.ticker.add(this.tickWrapper);
    }

    unregisterPixiApp = () => {
        if (!this._pixiApp) throw new Error('App is not registered to a PIXI App');
        this._pixiApp.ticker.remove(this.tickWrapper);
        this._pixiApp = null;
    }

    protected makeInteractable(character: Character) {
        const self = this;
        const container = character.view;
        container.interactive = container.buttonMode = true;
        container
            // events for drag start
            .on("mousedown", onDragStart)
            .on("touchstart", onDragStart)
            // events for drag end
            .on("mouseup", onDragEnd)
            .on("mouseupoutside", onDragEnd)
            .on("touchend", onDragEnd)
            .on("touchendoutside", onDragEnd)
            // events for drag move
            .on("mousemove", onDragMove)
            .on("touchmove", onDragMove);

        function onDragStart(event: MouseDragEvent) {
            event.isDragging = true;
        }

        function onDragEnd(event: MouseDragEvent) {
            event.isDragging = false;
        }

        function onDragMove(event: MouseDragEvent) {
            if (event.isDragging) {
                if (self._pixiApp) {
                    var newPosition = event.data?.getLocalPosition?.(self._pixiApp.stage);
                    character.setPosition(newPosition.x, newPosition.y, Position.CENTER);
                }
            }
        }
    }
}
