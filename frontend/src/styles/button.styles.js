import styled from 'styled-components';
import React from 'react';

export const DefaultButton = styled(props => <button {...props} />).attrs(
    ({ customproperty }) => ({
        customproperty,
    })
)`
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

export const ToggleButton = styled.button`
    font-family: Hack;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    color: var(--evidence-grey);
    background-color: var(--nero-white);
    border: 1px solid var(--evidence-grey);
    border-radius: var(--space-4);
    height: var(--space-40);
    min-width: var(--space-40);
    padding: 0 var(--space-16);
    white-space: nowrap;
    box-shadow: 0 3px 3px -1px var(--tonic-grey);

    &:hover {
        background-color: var(--hermanni-grey);
    }

    &:focus {
        color: var(--pirlo-blue);
    }

    &.selected {
        color: var(--nero-white);
        background-color: var(--titan-green);
        border-color: var(--titan-green);
    }
`;

export const ToggleButtonSmall = styled(ToggleButton)`
    font-size: 12px;
    height: var(--space-24);
    line-height: var(--space-24);
`;
