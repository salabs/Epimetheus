// eslint-disable-next-line
import React, { Fragment } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Filter from '../components/historyTable/Filter';
import Table from '../components/historyTable/Table';
import Checkbox from '../components/Checkbox';
import { useStateValue } from '../contexts/state';
import BranchFilter from '../components/BranchFilter';

const History = () => {
  const filterStyles = css`
    position: relative;
    .filter-container {
      display: flex;
      flex-flow: row wrap;
      max-width: 800px;
    }
    .loading-state {
      height: 30px;
      line-height: 30px;
      padding: 0;
      &:after {
        margin: 0;
        padding: 0;
        line-height: 30px;
        font-size: 1rem;
        content: '...';
        vertical-align: bottom;
        display: inline-block;
        width: 0px;
        height: 30px;
        animation-name: history-loader;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        overflow: hidden;
      }
      @keyframes history-loader {
        from {
          width: 0;
        }
        to {
          width: 140px;
        }
      }
    }
  `;
  const [{ loadingState, historyDataState }] = useStateValue();

  return (
    <main id="history" css={filterStyles}>
      <h1>History</h1>
      <div className="filter-container">
        <Filter />
        <BranchFilter />
      </div>

      {!historyDataState || loadingState ? (
        <div
          className="loading-state"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          aria-relevant="all"
        >
          Loading
        </div>
      ) : (
        <Fragment>
          <div
            className="sr-show"
            role="status"
            aria-live="polite"
            aria-relevant="all"
            aria-label="Content loaded."
          >
            Content loaded.
          </div>
          <Checkbox />
          <Table />
        </Fragment>
      )}
    </main>
  );
};

export default History;
