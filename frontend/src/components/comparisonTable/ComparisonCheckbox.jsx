// eslint-disable-next-line
import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';

const Checkbox = () => {
    // eslint-disable-next-line
    const [{ compareFilterMatch, compareFilterMismatch }, dispatch] = useStateValue();
    const [mismatchFilter, setMismatchFilter] = useState(
        compareFilterMatch.isChecked
    );
    const [matchFilter, setMatchFilter] = useState(
        compareFilterMismatch.isChecked
    );

    const handleMatchFilterChange = e => {
        dispatch({
            type: 'setCompareMatchFilter',
            filterType: matchFilter ? '' : e.target.value,
            isChecked: !matchFilter,
        });

        setMatchFilter(!matchFilter);
    };

    const handleMismatchFilterChange = e => {
        dispatch({
            type: 'setCompareMismatchFilter',
            filterType: mismatchFilter ? '' : e.target.value,
            isChecked: !mismatchFilter,
        });

        setMismatchFilter(!mismatchFilter);
    };

    return (
        <div id="last-run-checkbox-container">
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
