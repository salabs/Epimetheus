import React, { Fragment } from 'react';
import { dashify } from '../utils/helpers';
import styled from 'styled-components';

const StyledData = styled.td`
    padding: 10px;
    border: 1px solid black;
    text-align: left;
    vertical-align: top;
    background: var(--nero-white);
`;


// Show suite name separated on different lines with dots showing depth level
const SuiteName = ({ tableCellHeight, suiteName }) => {
    let tempSuiteName = suiteName.split('.');
    let splitSuiteName = [];
    for (var index = 0; index < tempSuiteName.length; index++) {
        let el = tempSuiteName[index];
        splitSuiteName.push(
            <Fragment key={index}>
                .{el}
                <br />
            </Fragment>
        );
    }
    return (
        <StyledData
            rowSpan={tableCellHeight}
            data-ta={`suite-${dashify(suiteName)}`}
        >
            {splitSuiteName}
        </StyledData>
    );
};

export default SuiteName;
