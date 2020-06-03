// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../contexts/state';

const Checkbox = () => {
    // eslint-disable-next-line
  const [{ lastRunFilterPass, lastRunFilterFail }, dispatch] = useStateValue();
    const [passFilter, setPassFilter] = useState(lastRunFilterPass.isChecked);
    const [failFilter, setFailFilter] = useState(lastRunFilterFail.isChecked);

    const filterStyles = css`
        padding: 20px 0 40px;
        label {
            margin-right: 20px;
            display: block;
            float: left;
            input {
                margin-left: 8px;
                position: relative;
                top: 1.5px;
                display: inline-block;
                transform: scale(1.2);
            }
        }
    `;

    const handlePassFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterPass',
            filterType: passFilter ? '' : e.target.value,
            isChecked: !passFilter
        });

        setPassFilter(!passFilter);
    };

    const handleFailFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterFail',
            filterType: failFilter ? '' : e.target.value,
            isChecked: !failFilter
        });

        setFailFilter(!failFilter);
    };

    return (
        <div id="last-run-checkbox-container" css={filterStyles}>
            <label labelfor="filterPassed">
                Hide passing tests
                <input
                    type="checkbox"
                    name="filterPassed"
                    value="PASS"
                    checked={lastRunFilterPass.isChecked}
                    onChange={e => handlePassFilterChange(e)}
                />
            </label>
            <label labelfor="filterFailed">
                Hide failing tests
                <input
                    type="checkbox"
                    name="filterFailed"
                    value="FAIL"
                    checked={failFilter}
                    onChange={e => handleFailFilterChange(e)}
                />
            </label>
        </div>
    );
};

export default Checkbox;
