import styled from 'styled-components';

export const LogRow = styled.tr`
    background-color: ${props =>
        props.log_level === 'FAIL' && 'var(--nelson-purple)'};
    color: ${props => props.log_level === 'FAIL' && 'var(--nero-white)'};

    &:hover {
        color: ${props => props.log_level === 'FAIL' && 'var(--nelson-purple)'};

        svg path {
            fill: var(--nelson-purple);
        }

        .suite-log-message {
            .can-be-opened {
                &::after {
                    background-color: var(--kumpula-yellow);
                }
            }
        }
    }

    &:not(:hover) {
        .suite-log-message {
            .can-be-opened {
                &::after {
                    background-color: ${props =>
                        props.log_level === 'FAIL' && 'var(--nelson-purple)'};
                }
            }
        }
    }
`;

export const InfoLevel = styled.td`
    white-space: nowrap;

    span {
        position: relative;
        top: -2px;
        margin: 0 10px;
    }
`;
