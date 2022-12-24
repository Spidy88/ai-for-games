import { Character, Position } from '../../models/character';
import { BaseApp } from '../base-app';
import { standardKinematicUpdate } from '../../util/update';
import { ControlType, RangeControl } from '../../models/app';
import { Graphic } from '../../models/graphic';
import spidyUrl from '../../assets/spidy-avatar.png';
import treeUrl from '../../assets/tree-graphic.png';

type Options = {
    gravity: number;
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
            gravity: -10
        };

        const gravityControl: RangeControl = {
            type: ControlType.Range,
            label: 'Gravity',
            min: -500,
            max: 0,
            step: 10,
            get value() {
                return self._options.gravity;
            },
            onChange(value: number) {
                self._options.gravity = value;
            }
        };

        this._controls.push(gravityControl);
    }

    reset = () => {
        const screenWidth = this._pixiApp!.screen.width;
        const screenHeight = this._pixiApp!.screen.height;

        this._spidy.setPosition(0, 0, Position.TOP_LEFT);
        this._trees[0].setPosition(0, screenHeight - 30, Position.BOTTOM);
        this._trees[1].setPosition(screenWidth / 2, screenHeight - 60, Position.BOTTOM);
        this._trees[2].setPosition(screenWidth, screenHeight, Position.BOTTOM);
    }

    onTick = (delta: number) => {
        // TODO: Calculate velocity
        standardKinematicUpdate(delta, {
            angular: 0,
            linear: [0, this._options.gravity * -1]
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
        const screenHeight = this._pixiApp!.screen.height;

        // Where is character position anchored?
        const adjustment = 0;

        if (adjustment > 0) {
            // TODO: Move character back to center
            // TODO: Move trees further to account for centering
        }
    }
}
