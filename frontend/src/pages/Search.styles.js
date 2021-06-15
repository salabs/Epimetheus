import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DropdownContainer = styled.div`
    margin-bottom: var(--space-16);

    @media only screen and (min-width: 1024px) {
        max-width: 60%;
    }
`;

export const SearchAction = styled(Link)`
    display: inline-block;
    margin-top: var(--space-8);
`;
