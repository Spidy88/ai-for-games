import { Character, Position } from '../../models/character';
import { BaseApp } from '../base-app';
import { standardKinematicUpdate } from '../../util/update';
import { ControlType, RangeControl } from '../../models/app';
import { Graphic } from '../../models/graphic';
import spidyUrl from '../../assets/spidy-avatar.png';
import treeUrl from '../../assets/tree-graphic.png';

type Options = {
    gravity: number;
    initialSpeed: number;
};

export class FlightApp extends BaseApp {
    private _spidy: Character;
    private _trees: [Graphic, Graphic, Graphic];
    private _options: Options;

    constructor() {
        super();
        const self = this;

        this._spidy = new Character({
            avatarUrl: spidyUrl,
            hideRotation: false
        });
        this._trees = [
            new Graphic({
                graphicUrl: treeUrl,
                size: [305, 442],
                scale: 0.5
            }),
            new Graphic({
                graphicUrl: treeUrl,
                size: [305, 442],
                scale: 0.4
            }),
            new Graphic({
                graphicUrl: treeUrl,
                size: [305, 442],
                scale: 0.6
            })
        ];

        this._characters.push(this._spidy);
        this._graphics.push(...this._trees);
        this._options = {
            gravity: 50,
            initialSpeed: 50
        };

        const gravityControl: RangeControl = {
            type: ControlType.Range,
            label: 'Gravity',
            min: 0,
            max: 500,
            step: 10,
            get value() {
                return self._options.gravity;
            },
            onChange(value: number) {
                self._options.gravity = value;
            }
        };
        const initialSpeedControl: RangeControl = {
            type: ControlType.Range,
            label: 'Initial Speed',
            min: 0,
            max: 1000,
            step: 25,
            get value() {
                return self._options.initialSpeed;
            },
            onChange(value: number) {
                self._options.initialSpeed = value;
            }
        }

        this._controls.push(gravityControl, initialSpeedControl);
        this._watchers.push({
            label: 'Velocity X',
            get value() {
                return String(~~self._spidy.velocity[0]);
            }
        }, {
            label: 'Velocity Y',
            get value() {
                return String(~~self._spidy.velocity[1]);
            }
        }, {
            label: 'Speed',
            get value() {
                return String(~~self._spidy.speed);
            }
        }, {
            label: 'Tree 1',
            get value() {
                return String(~~self._trees[0].position[0]);
            }
        }, {
            label: 'Tree 2',
            get value() {
                return String(~~self._trees[1].position[0]);
            }
        }, {
            label: 'Tree 3',
            get value() {
                return String(~~self._trees[2].position[0]);
            }
        });
    }

    reset = () => {
        const screenWidth = this._pixiApp!.screen.width;
        const screenHeight = this._pixiApp!.screen.height;

        this._spidy.setPosition(0, 0, Position.TOP_LEFT);
        this._spidy.velocity = [this._options.initialSpeed, 0];
        this._trees[0].setPosition(0, screenHeight - 30, Position.BOTTOM);
        this._trees[1].setPosition(screenWidth / 2, screenHeight - 60, Position.BOTTOM);
        this._trees[2].setPosition(screenWidth, screenHeight, Position.BOTTOM);
    }

    onTick = (delta: number) => {
        // TODO: Calculate velocity
        standardKinematicUpdate(delta, {
            angular: 0,
            linear: [this._options.initialSpeed, this._options.gravity]
        }, this._spidy);

        this.checkIfGrounded();
        this.keepCentered();
        // TODO: Adjust player position to remain on first half of screen
        // TODO: Move background (to show speed)
        // TODO: Only move background once we hit middle of screen? 1/4 from left?
    }

    private checkIfGrounded() {
        const character = this._spidy;
        const size = [this._pixiApp!.screen.width, this._pixiApp!.screen.height];
        const padding = this._spidy.size * 0.5
        const bottom = size[1] - padding;

        if (character.position[1] > bottom) {
            character.position = [character.position[0], bottom];
            return true;
        }
        
        return false;
    }

    private keepCentered() {
        const character = this._spidy;
        const screenWidth = this._pixiApp!.screen.width;

        // Where is character position anchored?
        const characterPos = character.position;//character.getPosition(Position.CENTER);
        const adjustment = characterPos[0] - (screenWidth / 2);

        if (adjustment > 0) {
            character.setPosition(characterPos[0] - adjustment, characterPos[1], Position.CENTER);
            this._trees.forEach((tree, i) => {
                let x = tree.position[0] - adjustment;
                console.log(`Tree ${i + 1}: ${x}`);
                if (x < 0) {
                    x += screenWidth;
                    console.log(`Updated: ${x}`);
                }
                tree.setPosition(tree.position[0] - adjustment, tree.position[1], Position.CENTER);
            });
        }
    }
}
