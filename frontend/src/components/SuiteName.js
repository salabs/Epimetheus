import React, { Fragment } from 'react';
import { dashify } from '../helpers';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

// Show suite name separated on different lines with dots showing depth level
const SuiteName = ({ tableCellHeight, suiteName, suiteId }) => {
    const history = useHistory();
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
        <td rowSpan={tableCellHeight} data-ta={`suite-${dashify(suiteName)}`}>
            <Link to={`${history.location.pathname}/suite/${suiteId}`}>
                <span className="sr-show">Build </span>
                {splitSuiteName}
            </Link>
        </td>
    );
};

export default SuiteName;
