import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { StyledLink, BuildNumberCell } from './Heading.styles';
import { colorTypes } from '../../../../utils/colorTypes';
import { StateContext } from '../../../../contexts/state';
import { WideTh } from '../../../table/Table.styles';

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

export const Heading = ({ max_build_num }) => {
    const { state } = useContext(StateContext);
    const { amountOfBuilds, selectedSeriesState } = state;
    const { name } = useParams();

    let { id } = selectedSeriesState;
    let headingBuildNumbers = [];
    const LIMIT =
        max_build_num - amountOfBuilds > 0 ? max_build_num - amountOfBuilds : 0;

    for (let i = max_build_num; i > LIMIT; i--) {
        headingBuildNumbers.push(i);
    }

    // Use numeric sort to ensure correct build number ordering
    const buildNumbers = headingBuildNumbers
        .sort(compareNumbers)
        .reverse()
        .map(buildNumber => (
            <BuildNumberCell
                key={buildNumber}
                onMouseEnter={() => addBgColor(`id-${buildNumber}`)}
                onMouseLeave={() => removeBgColor(`id-${buildNumber}`)}
                className={`id-${buildNumber}`}
            >
                <StyledLink
                    to={`/team/${name}/series/${id}/build/${buildNumber}/history`}
                >
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

Heading.propTypes = {
    max_build_num: PropTypes.number.isRequired,
};
