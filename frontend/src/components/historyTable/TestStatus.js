import React from 'react';
import { useStateValue } from '../../contexts/state';
import { pickIcon } from '../TestIcon';
import styled from 'styled-components';

const UndefinedData = styled.td`
    background: var(--hermanni-grey);
    padding: 10px;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
`;

const DefinedData = styled.td`
    padding: 10px;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;
    background: var(--nero-white);
`;

const TableTestStatusCell = ({ builds }) => {
    const [
        {
            historyDataState: { max_build_num },
            amountOfBuilds,
        },
    ] = useStateValue();

    // Creates correct length (amountOfBuilds) of array populated with empty values.
    // The array is used as a base in renderTestStatusRow function
    // to make sure that every test status row is rendered on page with correct length.

    let arr = [];
    const LIMIT =
        max_build_num - amountOfBuilds > 0 ? amountOfBuilds : max_build_num;
    for (let i = 0; i < LIMIT; i++) {
        arr.push({
            build_number: max_build_num - i,
            test_status: '',
            suite_start_time: ''
        });
    }
    return arr.map((filledBuild, i) => {
        let test_status;
        try {
            test_status = builds.find(
                build => build.build_number === filledBuild.build_number
            ).test_status;
        } catch (error) {
            //console.error(error);
        }
        const testStatusIcon = pickIcon(test_status);
        if (test_status === undefined) {
            return (
                <UndefinedData
                    data-ta={`test-status-${i}`}
                    className={`centerTableCellContent test-result-undefined`}
                    key={i}
                >
                    {testStatusIcon}
                </UndefinedData>
            );
        } else {
            return (
                <DefinedData
                    data-ta={`test-status-${i}`}
                    className={`centerTableCellContent test-result-${test_status}`}
                    key={i}
                >
                    {testStatusIcon}
                </DefinedData>
            );
        }
    });
};

export default TableTestStatusCell;
