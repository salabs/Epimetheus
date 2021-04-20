import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';
import Checkbox from '../checkbox/Checkbox';
import { CheckboxContainer } from './ComparisonCheckbox.styles';

const ComparisonCheckbox = () => {
    const [
        { compareFilterMatch, compareFilterMismatch },
        dispatch,
    ] = useStateValue();
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
        <CheckboxContainer id="build-comparison-checkbox-filter">
            <Checkbox
                checked={matchFilter}
                onChange={e => handleMatchFilterChange(e)}
                value="match"
                label="Hide Matching tests"
            />
            <Checkbox
                checked={mismatchFilter}
                onChange={e => handleMismatchFilterChange(e)}
                value="mismatch"
                label="Hide Mismatched tests"
            />
        </CheckboxContainer>
    );
};

export default ComparisonCheckbox;
