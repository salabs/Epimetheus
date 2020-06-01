// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../../contexts/state';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

const Filter = () => {
    // eslint-disable-next-line
    const filterStyles = css`
        padding: 20px 40px 20px 0px;
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
        .selected {
            background-color: transparent;
            border: 2px solid #243b53;
            color: #243b53;
        }
        .button-group {
            display: flex;
            flex-direction: column;
        }
        input {
            border: 1px solid #eee;
            width: 100px;
            border-radius: 10px;
            background-color: white;
            padding: 5px;
            margin: 5px;
            cursor: pointer;
        }
        label {
            padding-left: 5px;
        }
    `;

    const options = [5, 10, 15, 30, 100];

    return (
        <div id="history-filter-container" css={filterStyles}>
            <h4>
                <label htmlFor="history-filter">Display builds</label>
            </h4>
            <ButtonGroup options={options} />
        </div>
    );
};

const FilterButton = ({ title }) => {
    const [{ amountOfBuilds }, dispatch] = useStateValue();
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const updateTags = tag => {
        queryParams.set('numberofbuilds', tag);
        return queryParams.toString();
    };

    const handleFilterChange = e => {
        dispatch({ type: 'setAmountOfBuilds', amountOfBuilds: title });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e.target.value)}`,
            state: {}
        });
    };

    return (
        <input
            type="button"
            value={title}
            onClick={e => handleFilterChange(e)}
            className={
                title === parseInt(amountOfBuilds, 10) ? 'selected' : 'disabled'
            }
        />
    );
};

const ButtonGroup = ({ options }) => {
    return (
        <div className={'button-group'}>
            {options.map((i, index) => {
                return <FilterButton title={i} key={index} />;
            })}
        </div>
    );
};
export default Filter;
