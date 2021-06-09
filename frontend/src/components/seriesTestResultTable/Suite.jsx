import React from 'react';
import PropTypes from 'prop-types';
import { buildPropType, testCasePropType } from '../../utils/PropTypes';
import { dashify } from '../../utils/helpers';
import SuiteName from './SuiteName';
import TestStatus from './TestStatus';
import TestCase from './TestCase';
import { SuiteRow } from '../table/Table.styles';

const Suite = ({
    builds,
    test_case,
    suite,
    index,
    test_cases,
    max_build_num,
}) => {
    return (
        <SuiteRow data-ta={`${dashify(suite)}`}>
            {index === 0 && (
                <SuiteName
                    suiteName={suite}
                    tableCellHeight={test_cases.length}
                />
            )}
            <TestCase test_case={test_case} position={index} />
            <TestStatus
                builds={builds}
                position={index}
                max_build_num={max_build_num}
            />
        </SuiteRow>
    );
};

Suite.propTypes = {
    builds: PropTypes.arrayOf(buildPropType).isRequired,
    test_case: PropTypes.string.isRequired,
    suite: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    text_cases: testCasePropType,
    max_build_num: PropTypes.number.isRequired,
};

export default Suite;
