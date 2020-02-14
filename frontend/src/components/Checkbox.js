// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../contexts/state';

const Checkbox = () => {
  // eslint-disable-next-line
  const [{ historyFilterPass, historyFilterFail }, dispatch] = useStateValue();
  const [passFilter, setPassFilter] = useState(historyFilterPass.isChecked);
  const [failFilter, setFailFilter] = useState(historyFilterFail.isChecked);

  const filterStyles = css`
    padding: 10px 0 40px 0;
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

  const handlePassFilterChange = e => {
    dispatch({
      type: 'setHistoryFilterPass',
      filterType: passFilter ? '' : e.target.value,
      isChecked: !passFilter
    });

    setPassFilter(!passFilter);
  };

  const handleFailFilterChange = e => {
    dispatch({
      type: 'setHistoryFilterFail',
      filterType: failFilter ? '' : e.target.value,
      isChecked: !failFilter
    });

    setFailFilter(!failFilter);
  };

  return (
    <div id="history-checkbox-container" css={filterStyles}>
      <label labelfor="filterPassed">
        Hide fully passing tests
        <input
          type="checkbox"
          name="filterPassed"
          value="PASS"
          checked={passFilter}
          onChange={e => handlePassFilterChange(e)}
        />
      </label>
      <label labelfor="filterFailed">
        Hide fully failing tests
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
