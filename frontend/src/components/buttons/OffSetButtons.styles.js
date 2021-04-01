import styled from 'styled-components';

export const Heading = styled.div`
    color: var(--evidence-grey);
    margin: var(--space-8) 0;
`;

export const FlexDiv = styled.div`
    display: flex;

    > * {
        margin-right: var(--space-8);
    }
`;

export const StyledInput = styled.input`
    border: 1px solid var(--evidence-grey);
    border-radius: var(--space-4);
    max-width: var(--space-64);
    height: var(--space-32);
    text-align: right;
`;
