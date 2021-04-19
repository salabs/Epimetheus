import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';
import {
    StyledInput,
    StyledLabel,
} from '../testFilters/LastRunCheckbox.styles';
import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import { CheckboxContainer } from './ComparisonCheckbox.styles';

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
        <CheckboxContainer id="last-run-checkbox-container">
            <StyledLabel labelfor="filterMatch">
                <StyledInput
                    type="checkbox"
                    name="filterMatch"
                    value="match"
                    checked={matchFilter}
                    onChange={e => handleMatchFilterChange(e)}
                />
                <span>{matchFilter ? <Checked /> : <Unchecked />}</span>
                Hide Matching tests
            </StyledLabel>
            <StyledLabel labelfor="filterMismatch">
                <StyledInput
                    type="checkbox"
                    name="filterMismatch"
                    value="mismatch"
                    checked={mismatchFilter}
                    onChange={e => handleMismatchFilterChange(e)}
                />
                <span>{mismatchFilter ? <Checked /> : <Unchecked />}</span>
                Hide Mismatched tests
            </StyledLabel>
        </CheckboxContainer>
    );
};

export default Checkbox;
