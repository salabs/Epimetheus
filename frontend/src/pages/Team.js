import React, { Fragment } from 'react';
import { filterStyles } from '../styles/commonStyles';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';

const Team = () => {
  const [{ loadingState, branchesState }] = useStateValue();

  const { name } = useParams();

  return (
    <main id="team" css={filterStyles}>
      <h1>Team</h1>
      {console.log(name)}
      {!branchesState || loadingState ? (
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '5px'
          }}
        >
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

            {branchesState.series.map((x, y) => {
              return <Card series={x} key={y} />;
            })}
          </Fragment>
        </div>
      )}
    </main>
  );
};
export default Team;
