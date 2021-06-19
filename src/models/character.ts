import * as PIXI from "pixi.js";
import { KinematicCharacter, Vector } from "../types";
import orientationCircle from '../assets/character-circle.png';

export type CharacterOptions = {
    avatarUrl: string,
    size: number
};
export class Character implements KinematicCharacter {
    private container: PIXI.Container;
    private avatar: PIXI.Sprite;
    private circle: PIXI.Sprite;
    public rotation: number;
    public velocity: Vector;

    constructor(options: CharacterOptions) {
        this.rotation = 0;
        this.velocity = [0, 0];

        this.container = new PIXI.Container();
        this.avatar = PIXI.Sprite.from(options.avatarUrl);
        this.circle = PIXI.Sprite.from(orientationCircle);

        let characterSize = Math.floor(options.size);
        this.container.width = this.container.height = 256;
        this.avatar.width = this.avatar.height = 150;
        this.avatar.x = this.avatar.y = 128;
        this.avatar.anchor.set(0.5, 0.5);
        this.circle.width = this.circle.height = Math.sqrt(32768);
        this.circle.x = this.circle.y = 128;
        this.circle.anchor.set(0.5, 0.5);
        this.circle.angle = 135;

        this.container.addChild(this.circle, this.avatar);
        this.container.width = this.container.height = characterSize;
        this.container.x = this.container.y = 0;
    }

    get view() {
        return this.container;
    }

    get position() {
        return [this.container.x + this.container.width / 2, this.container.y + this.container.height / 2];
    }

    set position([x, y]) {
        this.container.x = x - this.container.width / 2;
        this.container.y = y - this.container.height / 2;
    }

    get orientation() {
        return this.circle.angle;
    }

    set orientation(orientation: number) {
        console.log('orientation: ', orientation);
        console.log('rotation: ', this.rotation);
        this.circle.angle = orientation;
    }

    get maxSpeed() {
        return 20;
    }

    get maxRotation() {
        return 15;
    }
}