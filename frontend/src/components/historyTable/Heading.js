import React from 'react';
import { useStateValue } from '../../contexts/state';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// helper for build number sorting
function compareNumbers(a, b) {
    return a - b;
}

const StyledLink = styled(Link)`
    display: block;
    width: 100%;
    margin: 0;
    padding: 0px;
    text-align: center;
    vertical-align: middle;
    height: 100%;
    transition: 0.33s background-color;
    &:hover,
    &:active {
        background-color: #ccc;
        transition: 0.1s background-color;
    }
`;

const Heading = () => {
    const [
        {
            historyDataState: { max_build_num },
            amountOfBuilds,
            selectedBranchState,
        },
        dispatch,
    ] = useStateValue();
    let { id } = selectedBranchState;
    let headingBuildNumbers = [];
    const LIMIT =
        max_build_num - amountOfBuilds > 0 ? max_build_num - amountOfBuilds : 0;

    for (let i = max_build_num; i > LIMIT; i--) {
        headingBuildNumbers.push(i);
    }

    const handleBuildClick = e => {
        const selectedBuild = e.target.innerText.slice(6);
        dispatch({
            type: 'setSelectedBuild',
            selectedBuild,
        });
    };

    // Use numeric sort to ensure correct build number ordering
    const buildNumbers = headingBuildNumbers
        .sort(compareNumbers)
        .reverse()
        .map(buildNumber => (
            <th key={buildNumber} onClick={e => handleBuildClick(e)}>
                <StyledLink to={`/series/${id}/build/${buildNumber}/history`}>
                    <span className="sr-show">Build </span>
                    {buildNumber}
                </StyledLink>
            </th>
        ));
    return (
        <thead className="history-table-head">
            <tr>
                <th>Suite</th>
                <th>Test</th>
                {buildNumbers}
            </tr>
        </thead>
    );
};

export default Heading;
