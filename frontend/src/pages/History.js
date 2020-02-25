// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Filter from '../components/historyTable/Filter';
import Table from '../components/historyTable/Table';
import Checkbox from '../components/Checkbox';
import { useStateValue } from '../contexts/state';
import BranchFilter from '../components/BranchFilter';
import { useParams } from 'react-router';

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
  const [{ loadingState, historyDataState, selectedBranchState, amountOfBuilds}, dispatch] = useStateValue();
  const { series } = useParams();
  const { builds } = useParams();
  const series_id = series || selectedBranchState.id || '1';
  const number_of_builds = builds || amountOfBuilds || '30';
  
  useEffect(() => {
    const url = `/data/history?builds=${number_of_builds}&series=${series_id}`;
    const fetchData = async () => {
      dispatch({ type: 'setLoadingState', loadingState: true });
      try {
        const res = await fetch(url, {});
        const json = await res.json();
        dispatch({
          type: 'updateHistory',
          historyData: json
        });
        dispatch({ type: 'setLoadingState', loadingState: false });
      } catch (error) {
        dispatch({ type: 'setErrorState', errorState: error });
      }
    };
    fetchData();
  }, [dispatch, series_id, number_of_builds]);
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
