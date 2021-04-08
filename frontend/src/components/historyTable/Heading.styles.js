import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
    height: 100%;
    text-decoration: none;

    &:hover {
        background-color: transparent;
    }
`;

export const BuildNumberCell = styled.th`
    padding-right: var(--space-8) !important;
    padding-left: var(--space-8) !important;
`;
