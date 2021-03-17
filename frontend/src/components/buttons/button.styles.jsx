import styled from 'styled-components';

export const DefaultButton = styled.button`
    font-family: Hack;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    color: var(--evidence-grey);
    white-space: nowrap;
    background-color: var(--nero-white);
    border: 1px solid var(--evidence-grey);
    border-radius: var(--space-4);
    height: var(--space-32);
    min-width: var(--space-32);
    line-height: var(--space-32);
    padding: 0 var(--space-8);

    svg {
        vertical-align: sub;

        path {
            fill: var(--evidence-grey);

            &[stroke] {
                stroke: var(--evidence-grey);
            }
        }
    }

    &:hover {
        background-color: var(--hermanni-grey);
    }

    &:focus {
        outline: 0;
        box-shadow: 0 0 0 4px var(--sparkling-blue);
        color: var(--pirlo-blue);

        svg path {
            fill: var(--pirlo-blue);

            &[stroke] {
                stroke: var(--pirlo-blue);
            }
        }
    }

    &[disabled] {
        border-color: var(--tonic-grey);
        color: var(--tonic-grey);

        svg path {
            fill: var(--tonic-grey);

            &[stroke] {
                stroke: var(--tonic-grey);
            }
        }
    }
`;
