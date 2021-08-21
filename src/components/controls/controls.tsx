import { useEffect } from 'react';
import styled from 'styled-components';
import useId from 'react-use-uuid';
import { App } from '../../models/app';
import { ControlPanel } from './controls.css';
import { AppControls } from './app-controls';
import playIcon from '../../assets/icons/play-circle-icon.svg';
import pauseIcon from '../../assets/icons/pause-circle-icon.svg';
import stepIcon from '../../assets/icons/next-circle-icon.svg';
import restartIcon from '../../assets/icons/restart-circle-icon.svg';

export type ControlsProps = {
    app: App
};

export function Controls(props: ControlsProps) {
    const { app } = props;
    const startBtnId = useId();
    const stopBtnId = useId();

    // Update our button states based on app state
    useEffect(() => {
        const startBtn = document.getElementById(startBtnId)!;
        const stopBtn = document.getElementById(stopBtnId)!;

        let isMounted = true;
        requestAnimationFrame(triggerUpdate);

        function triggerUpdate() {
            if (!isMounted) return;

            startBtn.hidden = app.isRunning;
            stopBtn.hidden = !app.isRunning;

            requestAnimationFrame(triggerUpdate);
        }

        return () => {
            isMounted = false;
        };
    }, [startBtnId, stopBtnId, app]);

    return (
        <ControlPanel>
            <ButtonPanel>
                <IconButton small onClick={app.reset}>
                    <img alt="Restart" src={restartIcon} width="100%" />
                </IconButton>

                <IconButton id={startBtnId} onClick={app.play}>
                    <img alt="Play" src={playIcon} width="100%" />
                </IconButton>

                <IconButton id={stopBtnId} onClick={app.pause}>
                    <img alt="Pause" src={pauseIcon} width="100%" />
                </IconButton>

                <IconButton small onClick={app.step}>
                    <img alt="Step by step" src={stepIcon} width="100%" />
                </IconButton>
            </ButtonPanel>

            <AppControls app={app} />
        </ControlPanel>
    );
}

const ButtonPanel = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
`;

type IconButtonProps = { small?: boolean };
const IconButton = styled.button`
    background: initial;
    border: initial;
    cursor: pointer;
    width: ${({ small }: IconButtonProps) => small ? '36px' : '48px'};
`;