import React, { Fragment, useEffect } from 'react';
import { filterStyles } from '../styles/commonStyles';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';

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

  return (
    <main id="team" css={filterStyles}>
      <h1>Team</h1>
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
        </Fragment>
      )}
    </main>
  );
};
export default Team;
