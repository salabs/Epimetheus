import styled from 'styled-components';

export const BreadcrumbList = styled.ol`
    font-size: 14px;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: var(--space-40) 0 0 0;

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

    span[aria-hidden='true'] {
        color: var(--tonic-grey);
        padding: 0 var(--space-8);
    }
`;
