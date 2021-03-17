import styled from 'styled-components';

export const StyledListContainer = styled.div`
    padding: 10px;
    display: inline-grid;
    min-width: 100%;
    height: 500px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.6fr 0.55fr 6fr;
    grid-template-areas:
        'selectorbox selectorbox'
        'table table';

    #stability-table {
        grid-area: table;
    }
`;

export const TableSelectors = styled.div`
    grid-area: selectorbox;
    margin-bottom: var(--space-16);

    button {
        margin-right: var(--space-8);
    }
`;
