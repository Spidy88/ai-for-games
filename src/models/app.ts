import * as PIXI from 'pixi.js';

export type Callback = () => unknown;
export type PixiCallback = (pixiApp: PIXI.Application) => unknown;

export interface AppClass {
    new (): App;
};

export enum ControlType {
    Range
};

export interface IWatcher {
    label: string;
    value: string;
};
export type Control = {
    type: ControlType;
    label: string;
    value: number;
    onChange: (value: number) => unknown;
};
export type RangeControl = Control & {
    type: ControlType.Range;
    min: number;
    max: number;
    step: number;
};

export interface App {
    isRunning: boolean;
    watchers: IWatcher[];
    debugWatchers: IWatcher[];
    controls: Control[];
    play: Callback;
    pause: Callback;
    reset: Callback;
    step: Callback;
    registerPixiApp: PixiCallback;
    unregisterPixiApp: Callback;
};
