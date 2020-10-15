import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BreadcrumbContainer = styled.div`
    font-size: 14px;
    padding: 48px 0 24px 198px;

    @media only screen and (max-width: 1024px) {
        padding: 48px 0 24px 108px;
    }

    a {
        text-decoration: none;
        font-weight: bold;
    }

    .TeamBreadCrumb {
        color: ${props => props.status === 'team' && 'var(--pirlo-blue)'};
    }

    .TeamBreadCrumb:hover {
        color: ${props =>
            props.status === 'team' && 'var(--pirlo-blue-darker)'};
    }

    .SeriesBreadCrumb {
        color: ${props => props.status === 'series' && 'var(--pirlo-blue)'};
    }

    .SeriesBreadCrumb:hover {
        color: ${props =>
            props.status === 'series' && 'var(--pirlo-blue-darker)'};
    }

    .BuildBreadCrumb {
        color: ${props => props.status === 'build' && 'var(--pirlo-blue)'};
    }

    .BuildBreadCrumb:hover {
        color: ${props =>
            props.status === 'build' && 'var(--pirlo-blue-darker)'};
    }
`;

export const StyledInnerDiv = styled.div`
    display: inline;

    #SuiteBreadCrumb {
        color: var(--pirlo-blue);
        font-weight: bolder;
    }

    span {
        color: var(--tonic-grey);
        padding-right: 8px;
    }
`;

export const StyledLink = styled(Link)`
    &:hover {
        text-decoration: underline;
        color: var(--titan-green-darker);
        background: var(--hermanni-grey-lighter);
    }
`;

export const TeamsLink = styled(StyledLink)`
    padding-left: 0 !important;
`;
