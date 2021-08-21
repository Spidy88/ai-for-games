import * as PIXI from 'pixi.js';
import { Character } from './character';

export type Callback = () => unknown;
export type PixiCallback = (pixiApp: PIXI.Application) => unknown;

export interface AppClass {
    new (): App;
};

export interface App {
    isRunning: boolean;
    characters: Character[];
    play: Callback;
    pause: Callback;
    reset: Callback;
    step: Callback;
    registerPixiApp: PixiCallback;
    unregisterPixiApp: Callback;
};
