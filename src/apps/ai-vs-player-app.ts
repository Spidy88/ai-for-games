import * as PIXI from 'pixi.js';
import { BaseApp } from './base-app';
import { Position, Character } from '../models/character';
import { length, normalize, sub, vectorAsOrientation } from '../util/vectors';
import spidyAvatarUrl from '../assets/spidy-avatar.png';
import villainAvatarUrl from '../assets/villain-avatar.png';

type MouseDragEvent = PIXI.InteractionEvent & {
    isDragging: boolean;
};

export type Options = {
    aiPosition?: Position;
    withRotation?: boolean;
};

export class AIvsPlayerApp extends BaseApp {
    protected _spidy: Character;
    protected _villain: Character;
    protected _aiPosition: Position;

    constructor({ aiPosition = Position.TOP_LEFT, withRotation = false }: Options = {}) {
        super();
        this._aiPosition = aiPosition;
        this._spidy = new Character({ avatarUrl: spidyAvatarUrl, hideRotation: !withRotation });
        this._villain = new Character({ avatarUrl: villainAvatarUrl, hideRotation: !withRotation });
        this.makeInteractable(this._villain);
        this._characters = [this._spidy, this._villain];
    }

    public reset = () => {
        let { x: aiX, y: aiY } = this.calculateAIPosition();
        this._spidy.setPosition(aiX, aiY, this._aiPosition);
        this._spidy.orientation = 0;
        this._spidy.velocity = [0, 0];
        this._spidy.rotation = 0;
        this._villain.setPosition(this._pixiApp?.screen.width ?? 0, this._pixiApp?.screen.height ?? 0, Position.BOTTOM_RIGHT);
        this._villain.orientation = 180;
        this._villain.velocity = [0, 0];
        this._villain.rotation = 0;
    }

    private calculateAIPosition() {
        let x = 0;
        let y = 0;

        if ([Position.TOP, Position.CENTER, Position.BOTTOM].includes(this._aiPosition)) {
            x = (this._pixiApp?.screen.width ?? 0) / 2;
        }
        else if([Position.TOP_RIGHT, Position.RIGHT, Position.BOTTOM_RIGHT].includes(this._aiPosition)) {
            x = (this._pixiApp?.screen.width ?? 0);
        }

        if ([Position.LEFT, Position.CENTER, Position.RIGHT].includes(this._aiPosition)) {
            y = (this._pixiApp?.screen.height ?? 0) / 2;
        }
        else if ([Position.BOTTOM_LEFT, Position.BOTTOM, Position.BOTTOM_RIGHT].includes(this._aiPosition)) {
            y = (this._pixiApp?.screen.height ?? 0);
        }
        
        return { x, y };
    }

    protected makeInteractable(character: Character) {
        const self = this;
        const container = character.view;
        container.interactive = container.buttonMode = true;
        container
            // events for drag start
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            // events for drag end
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            // events for drag move
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);

        function onDragStart(event: MouseDragEvent) {
            event.isDragging = true;
        }

        function onDragEnd(event: MouseDragEvent) {
            event.isDragging = false;
        }

        function onDragMove(event: MouseDragEvent) {
            if (event.isDragging) {
                if (self._pixiApp) {
                    const newPosition = event.data?.getLocalPosition?.(self._pixiApp.stage);
                    let targetDirection = sub([newPosition.x, newPosition.y], character.position);

                    if (length(targetDirection) > 0.001) {
                        targetDirection = normalize(targetDirection);
                        const targetOrientation = vectorAsOrientation(targetDirection, character.orientation);
                        character.orientation = targetOrientation;
                    }
                    
                    character.setPosition(newPosition.x, newPosition.y, Position.CENTER);
                }
            }
        }
    }
}
