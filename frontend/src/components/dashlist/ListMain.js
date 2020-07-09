import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
import styled from 'styled-components';

const FilterButton = ({ title }) => {
    const [{ amountShown }, dispatch] = useStateValue();
    return (
        <input
            type="button"
            value={title}
            onClick={() => dispatch({ type: 'setAmountShown', amount: title })}
        />
    );
};

const StyledListContainer = styled.div`
    padding: 10px;
    border-style: solid;
    border-width: thin;
    display: inline-grid;
    width: 500px;
    height: 550px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 0.6fr 0.55fr 6fr;
    grid-template-areas:
        'selectorbox selectorbox'
        'amount amount'
        'table table';
`;

const TableSelectors = styled.div`
    grid-area: selectorbox;
`;

const TableButtons = styled.button`
    padding: 10px;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 2px;
`;

const AmountSelectors = styled.div`
    grid-area: amount;
`;

const AmountButton = styled(FilterButton)`
    padding: 5px;
    margin-left: 4px;
    margin-right: 4px;
`;

const DashboardList = () => {
    const [window, setWindow] = useState('flakiness');

    return (
        <StyledListContainer id="list-container">
            <TableSelectors id="selector-buttons">
                <TableButtons
                    className="selector-button"
                    onClick={() => setWindow('flakiness')}
                >
                    Flakiness
                </TableButtons>
                <TableButtons
                    className="selector-button"
                    onClick={() => setWindow('failures')}
                >
                    Failures
                </TableButtons>
            </TableSelectors>
            <AmountSelectors className="amount-buttons">
                <AmountButton title={10} />
                <AmountButton title={30} />
                <AmountButton title={50} />
            </AmountSelectors>
            {window === 'flakiness' ? <FlakinessTable /> : <FailureTable />}
        </StyledListContainer>
    );
};

export default DashboardList;
