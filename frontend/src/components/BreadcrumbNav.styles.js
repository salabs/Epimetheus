import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BreadcrumbContainer = styled.div`
    font-size: 14px;
    margin: 10px 0px;
`;

export const StyledInnerDiv = styled.div`
    display: inline;
`;

export const StyledLink = styled(Link)`
    padding: 5px 5px 5px 10px;
    &:hover,
    &:active {
        background-color: #ccc;
        transition: 0.1s background-color;
    }
`;

export const TeamsLink = styled(StyledLink)`
    padding-left: 0 !important;
`;
