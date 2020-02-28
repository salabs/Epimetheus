import React, { Fragment } from 'react';
import { filterStyles } from '../styles/commonStyles';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';

const Team = () => {
  const [{ loadingState, branchesState }] = useStateValue();

  const { name } = useParams();

  function groupBy(objectArray, property) {
    return objectArray.reduce(function(acc, obj) {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  return (
    <main id="team" css={filterStyles}>
      <h1>Team</h1>
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
            {Object.entries(groupBy(branchesState.series, 'team')).map(
              (element, index) => {
                return <Card series={element} key={index} />;
              }
            )}
          </Fragment>
        </div>
      )}
    </main>
  );
};
export default Team;
