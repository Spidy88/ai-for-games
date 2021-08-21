import { useEffect } from 'react';
import useId from 'react-use-uuid';
import { App, IWatcher, Control, RangeControl, ControlType } from '../../models/app';
import styled from 'styled-components';

export type AppControlsProps = {
    app: App;
};

export function AppControls(props: AppControlsProps) {
    const { app } = props;
    const { controls, watchers } = app;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {watchers.map((watcher, i) => (
                    <Watcher key={`watcher-${i}`} watcher={watcher} />
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {controls.map((control, i) => (
                    <ControlComponent key={`control-${i}`} control={control} />
                ))}
            </div>
        </div>
    );
}

export function Watcher(props: { watcher: IWatcher }) {
    const { watcher } = props;
    const valueId = useId();

    useEffect(() => {
        const valueEl = document.getElementById(valueId)!;

        let isMounted = true;

        function updateValues() {
            if (!isMounted) return;

            valueEl.textContent = watcher.value;

            requestAnimationFrame(updateValues);
        }

        requestAnimationFrame(updateValues);

        return () => {
            isMounted = false;
        };
    }, [watcher, valueId]);

    return (
        <div>
            <div style={{ fontWeight: 300, fontSize: '0.8rem', marginBottom: '0.25rem' }}>{watcher.label}</div>
            <div id={valueId}>{watcher.value}</div>
        </div>
    )
}

export function ControlComponent(props: { control: Control }) {
    const { control } = props;

    return (
        <div>
            <div style={{ fontWeight: 300, fontSize: '0.8rem', marginBottom: '0.25rem' }}>{control.label}</div>

            {control.type === ControlType.Range && (
                <RangeControlComponent control={control as RangeControl} />
            )}
        </div>
    );
}

type ControlProps<T> = {
    control: T;
};
function RangeControlComponent(props: ControlProps<RangeControl>) {
    const { control } = props;
    const id = useId();
    const sliderId = `${id}-slider`;
    const numberId = `${id}-number`;

    const updateControlValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: Handle NaN
        const newValue = parseInt(e.target.value)
        control.onChange(newValue);
    }
    
    useEffect(() => {
        const sliderInputEl = document.getElementById(sliderId)! as HTMLInputElement;
        const numberInputEl = document.getElementById(numberId)! as HTMLInputElement;

        let isMounted = true;

        function updateValues() {
            if (!isMounted) return;

            sliderInputEl.value = String(control.value);
            numberInputEl.value = String(control.value);

            requestAnimationFrame(updateValues);
        }

        requestAnimationFrame(updateValues);

        return () => {
            isMounted = false;
        };
    }, [control, sliderId, numberId]);

    return (
        <RangeControlContainer>
            <RangeInput
                id={sliderId}
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={control.value}
                onChange={updateControlValue}
            />

            <NumberInput
                id={numberId}
                type="number"
                min={control.min}
                max={control.max}
                value={control.value}
                onChange={updateControlValue}
            />
        </RangeControlContainer>
    )
}

const RangeControlContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
`;

const RangeInput = styled.input`
    width: 100%;
`;

const NumberInput = styled.input`
    text-align: center;
    width: 4rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0; 
    }
`;
