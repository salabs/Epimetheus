// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../../contexts/state';

const Checkbox = () => {
    // eslint-disable-next-line
    const [{ compareFilterMatch, compareFilterMismatch }, dispatch] = useStateValue();
    const [mismatchFilter, setMismatchFilter] = useState(compareFilterMatch.isChecked);
    const [matchFilter, setMatchFilter] = useState(compareFilterMismatch.isChecked);
    
    const filterStyles = css`
        padding: 20px 0 40px;
        label {
            margin-right: 20px;
            display: block;
            float: left;
            input {
                margin-left: 8px;
                position: relative;
                top: -2.5px;
                display: inline-block;
                transform: scale(1.2);
            }
        }
    `;

    const handleMatchFilterChange = e => {
        dispatch({
            type: 'setCompareMatchFilter',
            filterType: matchFilter ? '' : e.target.value,
            isChecked: !matchFilter
        });

        setMatchFilter(!matchFilter);
    };

    const handleMismatchFilterChange = e => {
        dispatch({
            type: 'setCompareMismatchFilter',
            filterType: mismatchFilter ? '' : e.target.value,
            isChecked: !mismatchFilter
        });

        setMismatchFilter(!mismatchFilter);
    };

    return (
        <div id="last-run-checkbox-container" css={filterStyles}>
            <label labelfor="filterMatch">
                Hide Matching tests
                <input
                    type="checkbox"
                    name="filterMatch"
                    value="match"
                    checked={matchFilter}
                    onChange={e => handleMatchFilterChange(e)}
                />
            </label>
            <label labelfor="filterMismatch">
                Hide Mismatched tests
                <input
                    type="checkbox"
                    name="filterMismatch"
                    value="mismatch"
                    checked={mismatchFilter}
                    onChange={e => handleMismatchFilterChange(e)}
                />
            </label>
        </div>
    );
};

export default Checkbox;
