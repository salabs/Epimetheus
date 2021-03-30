import styled from 'styled-components';

export const BreadcrumbContainer = styled.nav`
    font-size: 14px;
    padding-top: var(--space-40);

    a {
        text-decoration: none;
        font-weight: bold;

        &:hover {
            text-decoration: underline;
            color: var(--titan-green-darker);
            background: var(--hermanni-grey-lighter);
        }

        &.active {
            color: var(--pirlo-blue);

            &:hover {
                color: var(--pirlo-blue-darker);
            }
        }
    }
`;

export const StyledInnerOl = styled.ol`
    display: inline;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;

    span {
        color: var(--tonic-grey);
        padding: 0 var(--space-8);
    }
`;
