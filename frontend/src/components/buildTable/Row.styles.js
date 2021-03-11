import styled from 'styled-components';

export const SuiteRow = styled.tr`
    border-top: ${props => props.position !== 0 && 'none !important'};

    &:hover {
        &:last-of-type {
            td:first-of-type {
                border-radius: 0 !important;
            }

            th {
                border-radius: 0 0 0 10px;
            }
        }

        th {
            background-color: var(--nero-white);
        }
    }

    &.childless {
        &:hover {
            th {
                background: inherit;
                & ~ td {
                    background: inherit;
                }
            }
        }
    }

    &:not(.childless) {
        th:hover {
            & ~ td {
                background: white;
            }
        }
    }

    td {
        border-bottom: 0 !important;

        &:first-of-type {
            padding-left: 0 !important;
        }
    }
`;
