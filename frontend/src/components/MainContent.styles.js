import styled from 'styled-components';

export const StyledDiv = styled.main`
    overflow: auto;
    width: 100%;
    min-height: calc(
        100vh - var(--space-80) - var(--space-48) - var(--space-64)
    );
    margin-bottom: var(--space-64);
`;
