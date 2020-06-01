// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useQueryParams } from '../hooks/useQuery';
import { useHistory, useLocation } from 'react-router-dom';

const Checkbox = () => {
    const filterStyles = css`
        display: flex;
        flex-direction: column;
        padding: 20px 40px 20px 0px;
        input {
            border: 1px solid #eee;
            border-radius: 10px;
            background-color: white;
            padding: 5px;
            margin: 5px;
            cursor: pointer;
        }
        .selected {
            background-color: transparent;
            border: 2px solid #243b53;
            color: #243b53;
        }
        h3 {
            padding-left: 7px;
        }
    `;
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const updateTags = tag => {
        let tagList = queryParams.getAll('tag');
        tagList.indexOf(tag) !== -1
            ? tagList.splice(tagList.indexOf(tag), 1)
            : tagList.push(tag);
        queryParams.delete('tag');
        tagList.forEach(element => queryParams.append('tag', element));
        return queryParams.toString();
    };

    const handleFilterChange = e => {
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e.target.value)}`,
            state: {}
        });
    };

    return (
        <div id="history-checkbox-container" css={filterStyles}>
            <h3>Hide tests</h3>
            <input
                type="button"
                value={'Passing'}
                className={
                    queryParams.getAll('tag').includes('Passing') === true
                        ? 'selected'
                        : ' '
                }
                onClick={e => handleFilterChange(e)}
            />
            <input
                type="button"
                value={'Failing'}
                className={
                    queryParams.getAll('tag').includes('Failing') === true
                        ? 'selected'
                        : ''
                }
                onClick={e => handleFilterChange(e)}
            />
        </div>
    );
};

export default Checkbox;
