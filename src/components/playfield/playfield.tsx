import { useRef, useEffect } from 'react';
import * as PIXI from "pixi.js";
import { Character } from '../../models/character';
import { wander } from '../../util/steering';
import { kinematicUpdate, keepOnScreen } from '../../util/update';

export type PlayfieldProps = {
    avatar: string,
    characters: Character[]
};

export function Playfield(props: PlayfieldProps) {
    const appRef = useRef<PIXI.Application>();
    const elRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
            let size = elRef.current!.parentElement!.getBoundingClientRect();
            const app = new PIXI.Application({
                width: size.width,
                height: size.height,
                transparent: true
            });

            elRef.current!.appendChild(app.view);

            appRef.current = app;
            //app.ticker.add(onTick);

            // TODO: REMOVE THIS
            let character = new Character({
                avatarUrl: props.avatar,
                size: size.width / 10
            });
            app.stage.addChild(character.view);

            const myTick = (delta: number) => {
                let steering = wander(character);
                kinematicUpdate(delta, steering, character);
                keepOnScreen(character, [size.width, size.height]);
            };
            app.ticker.add(myTick);

            return () => {
                //app.ticker.remove(onTick);
                app.ticker.remove(myTick);
                app.destroy(true);
            };
    }, [props.avatar]);

    return (
        <div ref={elRef} />
    );
}
