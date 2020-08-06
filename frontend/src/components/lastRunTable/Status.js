// eslint-disable-next-line
import React from 'react';
import { pickIcon } from '../TestIcon';
import styled from 'styled-components';

const StyledRow = styled.td`
    text-align: center !important;
    vertical-align: middle !important;
`;

const Status = ({ build, selectedBuild }) => {
    const testStatus =
        Number(selectedBuild) === build.build_number
            ? build.test_status
            : 'EMPTY';

    const testStatusIcon = pickIcon(testStatus);
    return <StyledRow>{testStatusIcon}</StyledRow>;
};

export default Status;
