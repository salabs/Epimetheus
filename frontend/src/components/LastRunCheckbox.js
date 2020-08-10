// eslint-disable-next-line
import React, { useState } from 'react';
import { useStateValue } from '../contexts/state';
import styled from 'styled-components';

const StyledDiv = styled.div`
    padding: 20px 0 40px;
`;

const StyledLabel = styled.label`
    margin-right: 20px;
    display: block;
    float: left;
`;

const StyleInput = styled.input`
    margin-left: 8px;
    position: relative;
    top: 1.5px;
    display: inline-block;
    transform: scale(1.2);
`;

const Checkbox = () => {
    // eslint-disable-next-line
    const [{ lastRunFilterPass, lastRunFilterFail }, dispatch] = useStateValue();
    const [passFilter, setPassFilter] = useState(lastRunFilterPass.isChecked);
    const [failFilter, setFailFilter] = useState(lastRunFilterFail.isChecked);

    const handlePassFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterPass',
            filterType: passFilter ? '' : e.target.value,
            isChecked: !passFilter,
        });

        setPassFilter(!passFilter);
    };

    const handleFailFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterFail',
            filterType: failFilter ? '' : e.target.value,
            isChecked: !failFilter,
        });

        setFailFilter(!failFilter);
    };

    return (
        <StyledDiv id="last-run-checkbox-container">
            <StyledLabel labelfor="filterPassed">
                Hide passing tests
                <StyleInput
                    type="checkbox"
                    name="filterPassed"
                    value="PASS"
                    checked={lastRunFilterPass.isChecked}
                    onChange={e => handlePassFilterChange(e)}
                />
            </StyledLabel>
            <StyledLabel labelfor="filterFailed">
                Hide failing tests
                <StyleInput
                    type="checkbox"
                    name="filterFailed"
                    value="FAIL"
                    checked={failFilter}
                    onChange={e => handleFailFilterChange(e)}
                />
            </StyledLabel>
        </StyledDiv>
    );
};

export default Checkbox;
