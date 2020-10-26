import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0px;
    text-align: center;
    height: 100%;
    transition: 0.33s background-color;
    text-decoration: none;

    .buildNumber:hover {
        background: var(--hermanni-grey-lighter);
    }
`;

export const BuildNumberCell = styled.th`
    :hover {
        background: var(--hermanni-grey-lighter);
    }
`;
