import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlgorithmCard = styled.article`
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    border-radius: 4px;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
`;

export const CardLink = styled(Link)`
    color: var(--main-text-color);
    text-decoration: none !important;
`;
