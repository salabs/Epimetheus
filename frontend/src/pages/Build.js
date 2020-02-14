// eslint-disable-next-line
import React, { Fragment, useEffect } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Table from '../components/lastRunTable/Table';
import LastRunCheckBox from '../components/LastRunCheckbox';
import { useStateValue } from '../contexts/state';
import LastRunHeading from '../components/LastRunHeading';
import MetadataTable from '../components/lastRunTable/MetadataTable';
import { useParams } from 'react-router';

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
  const [{ loadingState, historyDataState }, dispatch] = useStateValue();
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'setLoadingState', loadingState: true });
      if (id) {
        try {
          const res = await fetch(`/data/metadata?build_number=${id}`, {});
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
    fetchData();
  }, [dispatch, id]);

  return (
    <main id="last-run" css={filterStyles}>
      <LastRunHeading id={id} />
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
          <MetadataTable buildId={id} />
          <LastRunCheckBox />
          <Table id={id} />
        </Fragment>
      )}
    </main>
  );
};

export default Build;
