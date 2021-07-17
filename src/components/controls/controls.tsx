import { useEffect } from "react";
import { App } from "../../models/app";
import { CharacterControls } from "./character-controls";
import { useRerender } from "../../util/hooks";

export type ControlsProps = {
    app: App
};

export function Controls(props: ControlsProps) {
    const { app } = props;
    const rerender = useRerender();

    /* eslint react-hooks/exhaustive-deps: "off" */
    useEffect(() => {
        let isMounted = true;
        let lastStatus = app.isRunning;
        requestAnimationFrame(triggerUpdate);

        function triggerUpdate() {
            if (!isMounted) return;

            if (lastStatus !== app.isRunning) {
                rerender();
            }

            lastStatus = app.isRunning;
            requestAnimationFrame(triggerUpdate);
        }

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <div style={{ padding: 'var(--s300)', backgroundColor: 'var(--main-bg-color)', color: 'var(--main-text-color)', fontSize: 'var(--s400)' }}>
            <button disabled={app.isRunning} onClick={app.play}>Play</button>
            <button disabled={!app.isRunning} onClick={app.pause}>Stop</button>
            <button onClick={app.reset}>Reset</button>
            <button onClick={app.step}>Step</button>

            {app.characters.map((character) => (
                <CharacterControls key={character.id} character={character} />
            ))}
        </div>
    );
}
