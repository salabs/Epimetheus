import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';
import FlakinessTable from './FlakinessTable';
import FailureTable from './FailureTable';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
const DashboardList = () => {
    const [{ amountShown }, dispatch] = useStateValue();

    const [window, setWindow] = useState(true);

    const headingStyles = css`
        .list-container {
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
        }
        .selector-buttons {
            grid-area: selectorbox;
        }
        .selector-button {
            padding: 10px;
            margin-left: 4px;
            margin-right: 4px;
            margin-bottom: 2px;
        }
        .amount-buttons {
            grid-area: amount;
        }

        .amount-button {
            padding: 5px;
            margin-left: 4px;
            margin-right: 4px;
        }
        .flakiness-table {
            border-top: solid;
            border-color: #ddd;
            grid-area: table;
            max-width: 100%;
            max-height: 100%;
            overflow-y: scroll;
        }
        .failure-table {
            border-top: solid;
            border-color: #ddd;
            grid-area: table;
            max-width: 100%;
            max-height: 100%;
            overflow-y: scroll;
        }
        th:nth-of-type(1) {
            width: 70%;
        }
        th:nth-of-type(2) {
            width: 20%;
        }
        th:nth-of-type(3) {
            width: 10%;
        }
        th, td {
            border-bottom: 1px solid #ddd;
            padding-left: 5px;
            padding-right: 5px;
            text-align: left;
        }
    `;

    const FilterButton = ({ title }) => {
        return (
            <input
                className="amount-button"
                type="button"
                value={title}
                onClick={() =>
                    dispatch({ type: 'setAmountShown', amount: title })
                }
            />
        );
    };

    return (
        <div css={headingStyles}>
            <div className="list-container">
                <div className="selector-buttons">
                    <button
                        className="selector-button"
                        onClick={() => setWindow(true)}
                    >
                        Flakiness
                    </button>
                    <button
                        className="selector-button"
                        onClick={() => setWindow(false)}
                    >
                        Failures
                    </button>
                </div>
                <div className="amount-buttons">
                    <FilterButton title={10} />
                    <FilterButton title={30} />
                    <FilterButton title={50} />
                </div>
                {window ? <FlakinessTable /> : <FailureTable />}
            </div>
        </div>
    );
};

export default DashboardList;
