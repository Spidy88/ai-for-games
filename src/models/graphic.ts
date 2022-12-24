import * as PIXI from 'pixi.js';
import { v4 as uuid } from 'uuid';
import { Vector } from '../types';
import { Position } from './character';

export type GraphicOptions = {
    graphicUrl: string;
    size: [number, number];
    scale?: number;
};

export class Graphic {
    public readonly id: string;
    private _container: PIXI.Container;
    private _graphic: PIXI.Sprite;
    private _position: Vector;
    private _orientation: number;

    constructor(options: GraphicOptions) {
        this.id = uuid();
        this._position = [0, 0];
        this._orientation = 0;

        this._container = new PIXI.Container();
        this._graphic = PIXI.Sprite.from(options.graphicUrl);

        this._container.width = options.size[0];
        this._container.height = options.size[1];
        this._graphic.width = options.size[0];
        this._graphic.height = options.size[1];
        this._graphic.x = this._graphic.y = 0;
        //this._graphic.anchor.set(0.5, 0.5);

        this._container.addChild(this._graphic);
        // I remember this was for re-scaling
        this._container.width = Math.floor(options.size[0] * (options.scale ?? 1));
        this._container.height = Math.floor(options.size[1] * (options.scale ?? 1));
        this._container.x = this._container.y = 0;
    }

    get view() {
        return this._container;
    }

    get position() {
        return [
            this._position[0] + this._container.width / 2,
            this._position[1] + this._container.height / 2
        ];
    }

    set position([x, y]) {
        this.setPosition(x, y, Position.CENTER);
    }

    setPosition(x: number, y: number, position: Position) {
        if ([Position.TOP, Position.CENTER, Position.BOTTOM].includes(position)) {
            x -= this._container.width / 2;
        }
        else if ([Position.TOP_RIGHT, Position.RIGHT, Position.BOTTOM_RIGHT].includes(position)) {
            x -= this._container.width;
        }

        if ([Position.LEFT, Position.CENTER, Position.RIGHT].includes(position)) {
            y -= this._container.height / 2;
        }
        else if ([Position.BOTTOM_LEFT, Position.BOTTOM, Position.BOTTOM_RIGHT].includes(position)) {
            y -= this._container.height;
        }

        this._container.x = x;
        this._container.y = y;
        this._position[0] = x;
        this._position[1] = y;
    }

    get orientation() {
        return this._orientation;
    }

    set orientation(orientation: number) {
        this._orientation = (orientation % 360) + (orientation < 0 ? 360 : 0);
    }
}
