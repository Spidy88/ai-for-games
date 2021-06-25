import * as PIXI from "pixi.js";
import { v4 as uuid } from "uuid";
import { KinematicCharacter, Vector } from "../types";
import orientationCircle from '../assets/character-circle.png';

export type CharacterOptions = {
    avatarUrl: string,
    size?: number
};
export class Character implements KinematicCharacter {
    public readonly id: string;
    private _container: PIXI.Container;
    private _avatar: PIXI.Sprite;
    private _circle: PIXI.Sprite;
    private _orientation: number;
    private _rotation: number;
    private _velocity: Vector;
    private _maxSpeed: number;
    private _maxRotation: number;

    constructor(options: CharacterOptions) {
        this.id = uuid();
        this._orientation = 0;
        this._rotation = 0;
        this._velocity = [0, 0];
        this._maxSpeed = 5;
        this._maxRotation = 5;

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

        this._container.addChild(this._circle, this._avatar);
        this._container.width = this._container.height = Math.floor(options?.size ?? 256);
        this._container.x = this._container.y = 0;
    }

    get view() {
        return this._container;
    }

    get position() {
        return [
            this._container.x + this._container.width / 2,
            this._container.y + this._container.height / 2
        ];
    }

    set position([x, y]) {
        this._container.x = x - this._container.width / 2;
        this._container.y = y - this._container.height / 2;
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
