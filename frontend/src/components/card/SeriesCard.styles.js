import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardTitle = styled(Link)`
    text-decoration: none;
    margin: 2px var(--space-16) 0 0;
`;

export const CardSubTitle = styled(Link)`
    font-family: 'Noto Serif';
    text-transform: uppercase;
    text-decoration: none;
`;

export const CardValue = styled.span`
    color: var(--pirlo-blue);

    svg {
        background-color: var(--hermanni-grey-lighter);
        transform: scale(1.5);
        position: relative;
        right: var(--space-4);

        &[name='Fail'] {
            background-color: transparent;
        }
    }
`;
