import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { buildPropType } from '../../../../utils/PropTypes';
import { pickIcon } from '../../../../utils/TestIcon';
import { DefinedData } from './TestStatus.styles';
import { addBgColor, removeBgColor } from './Heading';
import { StateContext } from '../../../../contexts/state';

const TestStatus = ({ builds, position, max_build_num }) => {
    const { state } = useContext(StateContext);
    const { amountOfBuilds } = state;

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
            suite_start_time: '',
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
        let testStatusIcon;

        !test_status
            ? (testStatusIcon = pickIcon('EMPTY'))
            : (testStatusIcon = pickIcon(test_status));

        return (
            <DefinedData
                data-ta={`test-status-${i}`}
                className={`test-result-${test_status} id-${filledBuild.build_number}`}
                key={i}
                status={test_status}
                position={position}
                title={filledBuild.build_number}
                onMouseEnter={() =>
                    addBgColor(`id-${filledBuild.build_number}`)
                }
                onMouseLeave={() =>
                    removeBgColor(`id-${filledBuild.build_number}`)
                }
            >
                {testStatusIcon}
            </DefinedData>
        );
    });
};

TestStatus.propTypes = {
    builds: PropTypes.arrayOf(buildPropType).isRequired,
    position: PropTypes.number.isRequired,
    max_build_num: PropTypes.number.isRequired,
};

export default TestStatus;
