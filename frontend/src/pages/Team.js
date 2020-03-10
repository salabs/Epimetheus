import React, { Fragment, useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import { css, jsx } from '@emotion/core';
import Card from '../components/Card';
import { useParams } from 'react-router';
import SelectedTeam from '../components/SelectedTeam';

const Team = () => {
  const [{ loadingState, teamsState }, dispatch] = useStateValue();

  const { name } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'setLoadingState', loadingState: true });

      try {
        const res = await fetch('/data/teams', {});
        const json = await res.json();
        dispatch({ type: 'setLoadingState', loadingState: false });
        dispatch({ type: 'setTeams', teams: json.teams });
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  const filterStyles = css`
    position: relative;
    margin-top: 10px;
    .filter-container {
      display: flex;
      flex-wrap: wrap;
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
  return (
    <main id="team" css={filterStyles}>
      {!teamsState || loadingState ? (
        <div
          className="loading-state"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          aria-relevant="all"
        >
          Loading
        </div>
      ) : name ? (
        <SelectedTeam
          name={name}
          series={teamsState.find(element => element.name === name).series}
        />
      ) : (
        <div>
          <h1>Teams</h1>
          <div
            className="sr-show"
            role="status"
            aria-live="polite"
            aria-relevant="all"
            aria-label="Content loaded."
          >
            Content loaded.
          </div>
          {teamsState.map(({ name, series_count, series }, i) => {
            return (
              <Card
                team={name}
                numberOfSeries={series_count}
                lastRun={series[0]}
                key={i}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};
export default Team;
