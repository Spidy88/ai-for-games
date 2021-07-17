import * as PIXI from "pixi.js";
import { v4 as uuid } from "uuid";
import { KinematicCharacter, Vector } from "../types";
import orientationCircle from '../assets/character-circle.png';

export enum Position {
    CENTER,
    LEFT,
    TOP,
    RIGHT,
    BOTTOM,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

export type CharacterOptions = {
    avatarUrl: string,
    size?: number,
    hideRotation?: boolean
};
export class Character implements KinematicCharacter {
    public readonly id: string;
    private _container: PIXI.Container;
    private _avatar: PIXI.Sprite;
    private _circle: PIXI.Sprite;
    private _position: Vector;
    private _orientation: number;
    private _rotation: number;
    private _velocity: Vector;
    private _maxSpeed: number;
    private _maxRotation: number;

    constructor(options: CharacterOptions) {
        this.id = uuid();
        this._position = [0, 0];
        this._orientation = 0;
        this._rotation = 0;
        this._velocity = [0, 0];
        this._maxSpeed = 240;
        this._maxRotation = 120;

        this._container = new PIXI.Container();
        this._avatar = PIXI.Sprite.from(options.avatarUrl);
        this._circle = PIXI.Sprite.from(orientationCircle);

        this._container.width = this._container.height = 256;
        this._avatar.width = this._avatar.height = 150;
        this._avatar.x = this._avatar.y = 128;
        this._avatar.anchor.set(0.5, 0.5);
        this._circle.width = this._circle.height = Math.sqrt(32768);
        this._circle.x = this._circle.y = 128;
        this._circle.anchor.set(0.5, 0.5);
        this._circle.angle = 135;

        if (options.hideRotation) {
            this._circle.alpha = 0;
        }

        this._container.addChild(this._circle, this._avatar);
        this._container.width = this._container.height = Math.floor(options?.size ?? 256);
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
        this._circle.angle = 360 - this._orientation + 135;
    }

    get velocity() {
        return this._velocity;
    }

    set velocity(velocity: Vector) {
        this._velocity = velocity;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rotation: number) {
        this._rotation = rotation;
    }

    get maxSpeed() {
        return this._maxSpeed;
    }

    set maxSpeed(maxSpeed: number) {
        this._maxSpeed = maxSpeed;
    }

    get maxRotation() {
        return this._maxRotation;
    }

    set maxRotation(maxRotation: number) {
        this._maxRotation = maxRotation;
    }

    get size() {
        return this._container.width;
    }

    set size(size: number) {
        this._container.width = this._container.height = size;
    }
}
