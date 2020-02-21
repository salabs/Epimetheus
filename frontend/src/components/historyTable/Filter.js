// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../../contexts/state';

const Filter = () => {
  const [{ amountOfBuilds }, dispatch] = useStateValue();
  const filterStyles = css`
    padding: 20px 40px 20px 0px;
    width: 50%;
    min-width: 250px;
    select {
      width: 200px;
      padding: 10px 10px;
      margin: 0;
      border: 1px solid #333;
      border-radius: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
      background-repeat: no-repeat, repeat;
      background-position: right 0.5em top 50%, 0 0;
      background-size: 1.2em auto, 100%;
      background-color: #fefefe;
    }
  `;

  const options = [5, 10, 15, 30, 100];

  const onFilterChange = e => {
    dispatch({ type: 'setAmountOfBuilds', amountOfBuilds: e.target.value });
  };

  return (
    <div id="history-filter-container" css={filterStyles}>
      <h2>
        <label htmlFor="history-filter">Amount of builds</label>
      </h2>
      <select
        name="history-filter"
        id="history-filter"
        onChange={e => onFilterChange(e)}
        onBlur={e => onFilterChange(e)}
        value={amountOfBuilds}
      >
        {options.map(buildAmount => {
          return (
            <option key={buildAmount} value={buildAmount}>
              {buildAmount}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
