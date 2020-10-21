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
        'amount amount'
        'table table';
`;

export const TableSelectors = styled.div`
    grid-area: selectorbox;
`;

export const TableButtons = styled.button`
    padding: 10px;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 2px;
    background-color: ${props => props.color};
    color: var(--gradient-black);
    border: 1px solid var(--gradient-black);
    outline: none;
`;
