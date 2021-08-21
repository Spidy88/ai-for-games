import styled from 'styled-components';

export const PageContainer = styled.div`
    padding-bottom: 10vh;
`;

export const PlaygroundContainer = styled.div`
    outline: 1px solid var(--main-bg-color);
    background-color: var(--main-bg-color);
    height: 400px;
`;

export const ControlsContainer = styled.div`
    border-radius: 4px;
`;

export const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
`;