import React from 'react';
import { useStateValue } from '../../contexts/state';
import { StyledLink, BuildNumberCell } from './Heading.styles';
import { colorTypes } from '../../utils/colorTypes';
import { WideTh } from '../table/Table.styles';

// helper for build number sorting
function compareNumbers(a, b) {
    return a - b;
}

export function addBgColor(id) {
    const elements = document.getElementsByClassName(id);

    for (let item of elements) {
        item.style.backgroundColor = colorTypes['kumpula yellow'];
    }
}

export function removeBgColor(id) {
    const elements = document.getElementsByClassName(id);

    for (let item of elements) {
        item.style = '';
    }
}

export const Heading = () => {
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
            <BuildNumberCell
                key={buildNumber}
                onClick={e => handleBuildClick(e)}
                onMouseEnter={() => addBgColor(`id-${buildNumber}`)}
                onMouseLeave={() => removeBgColor(`id-${buildNumber}`)}
                className={`id-${buildNumber}`}
            >
                <StyledLink to={`/series/${id}/build/${buildNumber}/history`}>
                    <span className="sr-show">Build </span>
                    {buildNumber}
                </StyledLink>
            </BuildNumberCell>
        ));
    return (
        <thead id="history-table-head">
            <tr>
                <WideTh>Suite</WideTh>
                <WideTh>Test</WideTh>
                {buildNumbers}
            </tr>
        </thead>
    );
};
