import styled from 'styled-components';

export const HeaderSection = styled.section`
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
`;

export const BookCoverImg = styled.img`
    max-height: 250px;
`;

export const DemoSection = styled.section`
    display: grid;
    grid-template-columns: 1fr 35vw;
    gap: 1rem;
    margin: 2rem 0;
`;

export const PlaygroundContainer = styled.div`
    outline: 1px solid var(--main-bg-color);
    background-color: var(--main-bg-color);
    height: 300px;
`;

export const ControlsContainer = styled.div`
    border-radius: 4px;
`;
