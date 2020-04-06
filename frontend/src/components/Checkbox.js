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
    // label {
    //   margin-right: 20px;
    //   display: block;
    //   float: left;
    //   input {
    //     margin-left: 8px;
    //     position: relative;
    //     top: -2.5px;
    //     display: inline-block;
    //     transform: scale(1.2);
    //   }
    // }
    input {
      border: 1px solid #eee;
      border-radius: 10px;
      background-color: white;
      padding: 5px;
      margin: 5px;
    }
    .selected {
      background-color: transparent;
      border: 2px solid #243b53;
      color: #243b53;
    }
  `;
  const history = useHistory();
  const location = useLocation();
  const queryParams = useQueryParams();
  const handlePassFilterChange = e => {
    history.push({
      pathname: `${location.pathname}`,
      search: `?${updateTags(e.target.value)}`,
      state: {}
    });
  };

  const handleFailFilterChange = e => {
    history.push({
      pathname: `${location.pathname}`,
      search: `?${updateTags(e.target.value)}`,
      state: {}
    });
  };
  const updateTags = tag => {
    let tagList = queryParams.getAll('tag');
    tagList.indexOf(tag) !== -1
      ? tagList.splice(tagList.indexOf(tag), 1)
      : tagList.push(tag);
    queryParams.delete('tag');
    tagList.forEach(element => queryParams.append('tag', element));
    return queryParams.toString();
  };

  return (
    <div id="history-checkbox-container" css={filterStyles}>
      <h4>Hide tests</h4>
      <input
        type="button"
        value={'Passing'}
        className={
          queryParams.getAll('tag').includes('Passing') === true
            ? 'selected'
            : ' '
        }
        onClick={e => handlePassFilterChange(e)}
      />
      <input
        type="button"
        value={'Failing'}
        className={
          queryParams.getAll('tag').includes('Failing') === true
            ? 'selected'
            : 'disabled'
        }
        onClick={e => handleFailFilterChange(e)}
      />
    </div>
  );
};

export default Checkbox;
