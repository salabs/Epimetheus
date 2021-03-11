import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0px;
    text-align: center;
    height: 100%;
    text-decoration: none;
`;

export const BuildNumberCell = styled.th`
    padding-right: var(--space-8) !important;
    padding-left: var(--space-8) !important;

    &:hover {
        background: var(--hermanni-grey-lighter);
    }
`;

export const Th = styled.th`
    min-width: 200px;
`;
