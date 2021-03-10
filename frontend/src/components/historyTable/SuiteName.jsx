import React, { Fragment } from 'react';
import { dashify } from '../../utils/helpers';
import { HierarchicalSuiteNameTh } from '../table/Table.styles';

// Show suite name separated on different lines with dots showing depth level
const SuiteName = ({ tableCellHeight, suiteName }) => {
    let tempSuiteName = suiteName.split('.');
    let splitSuiteName = [];
    for (var index = 0; index < tempSuiteName.length; index++) {
        let el = tempSuiteName[index];
        splitSuiteName.push(
            <Fragment key={index}>
                <span>.{el}</span>
                <br />
            </Fragment>
        );
    }
    return (
        <HierarchicalSuiteNameTh
            rowSpan={tableCellHeight}
            data-ta={`suite-${dashify(suiteName)}`}
        >
            {splitSuiteName}
        </HierarchicalSuiteNameTh>
    );
};

export default SuiteName;
