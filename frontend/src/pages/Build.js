// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
import Table from '../components/lastRunTable/Table';
import LastRunCheckBox from '../components/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import LastRunHeading from '../components/LastRunHeading';
import MetadataTable from '../components/lastRunTable/MetadataTable';
import { useParams } from 'react-router';
import { css } from '@emotion/core';

const Build = () => {
  const filterStyles = css`
    position: relative;
    margin-top: 10px;
    .filter-container {
      display: flex;
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
        animation-name: lastrun-loader;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        overflow: hidden;
      }
      @keyframes lastrun-loader {
        from {
          width: 0;
        }
        to {
          width: 140px;
        }
      }
    }
  `;
  const [
    { loadingState, historyDataState, selectedBranchState, branchesState },
    dispatch
  ] = useStateValue();
  let { buildId } = useParams();
  //console.log(options.series);
  let { id } = useParams()
  const branch_id = id ||  selectedBranchState;
  
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'setLoadingState', loadingState: true });
      if (branch_id && buildId) {
        try {
          const res = await fetch(
            `/data/metadata?series=${branch_id}&build_number=${buildId}`,
            {}
          );
          const json = await res.json();
          dispatch({ type: 'setLoadingState', loadingState: false });
          dispatch({
            type: 'setMetadata',
            metadata: json
          });
        } catch (error) {
          //console.log(error);
        }
      }
    };
    const fetchHistoryData = async () => {
      dispatch({ type: 'setLoadingState', loadingState: true });
      if (branch_id && buildId) {
        const branch = branchesState.series?.find(
          ({ id:serie_id }) => serie_id === parseInt(branch_id,10)
        );
        dispatch({
          type: 'setSelectedBranch',
          name: branch?.name +" "+ branch?.team || " ",
          id: branch_id
        });
        dispatch({ type: 'setSelectedBuild', selectedBuild: buildId });
        try {
          const res = await fetch(
            ///`/data/history?series=${id}&builds=30`,
            `/data/history?start_from=${buildId}&series=${branch_id}&builds=5`,
            {}
          );
          const json = await res.json();
          dispatch({ type: 'setLoadingState', loadingState: false });
          dispatch({
            type: 'updateHistory',
            historyData: json
          });
        } catch (error) {}
      }
    };
    if (branchesState) {
      fetchHistoryData();
      fetchData();
    }
  }, [dispatch, branch_id, buildId, branchesState]);

  return (
    <main id="last-run" css={filterStyles}>
      <LastRunHeading id={buildId} />
      <div className="last-run-container"></div>
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
          <MetadataTable buildId={buildId} />
          <LastRunCheckBox />
          <Table id={branch_id} />
        </Fragment>
      )}
    </main>
  );
};

export default Build;
