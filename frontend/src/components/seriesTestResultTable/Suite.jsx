import React from 'react';
import { dashify } from '../../utils/helpers';
import SuiteName from './SuiteName';
import TestStatus from './TestStatus';
import TestCase from './TestCase';
import { SuiteRow } from '../table/Table.styles';

const Suite = ({ builds, test_case, suite, index, test_cases }) => {
    return (
        <SuiteRow data-ta={`${dashify(suite)}`}>
            {index === 0 && (
                <SuiteName
                    suiteName={suite}
                    tableCellHeight={test_cases.length}
                />
            )}
            <TestCase test_case={test_case} position={index} />
            <TestStatus builds={builds} position={index} />
        </SuiteRow>
    );
};

export default Suite;
