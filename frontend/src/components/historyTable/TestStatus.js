import React from 'react';
import { useStateValue } from '../../contexts/state';
import TestIcon from '../TestIcon';
import theme from '../../styles/theme';

const pickIcon = test_status => {
    let result = '';

    switch (test_status) {
        case 'PASS':
            result = (
                <TestIcon
                    text="Pass"
                    type="check"
                    iconColor={theme.colors.pass}
                />
            );
            break;
        case 'FAIL':
            result = (
                <TestIcon
                    text="Fail"
                    type="times"
                    iconColor={theme.colors.fail}
                />
            );
            break;
        case 'SKIPPED':
            result = (
                <TestIcon
                    text="Skipped"
                    type="circle"
                    iconColor={theme.colors.skipped}
                />
            );
            break;
        default:
            result = <span className="sr-show">Empty</span>;
    }

    return result;
};

const TableTestStatusCell = ({ builds }) => {
    const [
        {
            historyDataState: { max_build_num },
            amountOfBuilds
        }
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

        return (
            <td
                data-ta={`test-status-${i}`}
                className={`centerTableCellContent test-result-${test_status}`}
                key={i}
            >
                {testStatusIcon}
            </td>
        );
    });
};

export default TableTestStatusCell;
