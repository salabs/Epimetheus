import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BreadcrumbContainer = styled.div`
    font-size: 14px;
    padding-top: var(--space-40);

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

export const StyledInnerDiv = styled.ol`
    display: inline;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;

    #SuiteBreadCrumb {
        color: var(--pirlo-blue);
        font-weight: bolder;
    }

    span {
        color: var(--tonic-grey);
        padding: 0 var(--space-8);
    }
`;

export const StyledLink = styled(Link)`
    &:hover {
        text-decoration: underline;
    }
`;

export const TeamsLink = styled(StyledLink)`
    padding-left: 0 !important;
`;
