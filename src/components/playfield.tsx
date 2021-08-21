import { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { App } from '../models/app';

export type PlayfieldProps = {
    app: App
};

export function Playfield(props: PlayfieldProps) {
    const { app } = props;
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let size = elRef.current!.parentElement!.getBoundingClientRect();
        const pixiApp = new PIXI.Application({
            width: size.width,
            height: size.height,
            transparent: true
        });

        elRef.current!.appendChild(pixiApp.view);
        app.registerPixiApp(pixiApp);

        return () => {
            app.unregisterPixiApp();
            pixiApp.destroy(true);
        };
    }, [app]);

    return (
        <div ref={elRef} />
    );
}
