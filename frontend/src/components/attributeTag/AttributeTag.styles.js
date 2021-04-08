import styled from 'styled-components';

export const AttributeTagContainer = styled.div`
    padding: 0 var(--space-8);
    border-radius: var(--space-8);
    font-size: 10px;
    margin: 0 var(--space-8);
    display: inline-block;
    line-height: 14px;
    white-space: nowrap;

    &.grey {
        border: 1px solid var(--tonic-grey);
    }

    &.yellow {
        border: 1px solid var(--tonic-grey);
        background-color: var(--kumpula-yellow);
    }

    &.blue {
        border: 1px solid var(--pirlo-blue);
        background-color: var(--pirlo-blue);
        color: var(--nero-white);
    }

    &.purple {
        border: 1px solid var(--nelson-purple);
        background-color: var(--nelson-purple);
        color: var(--nero-white);
    }
`;
