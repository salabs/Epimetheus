import React, { Fragment } from 'react';
import { filterStyles } from '../styles/commonStyles';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';

const Team = () => {
  const [{ loadingState, branchesState }] = useStateValue();

  const { name } = useParams();

  // Totally not from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Grouping_objects_by_a_property
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
      {name && branchesState && groupBy(branchesState.series, 'team')[name] ? (
        <div>
          <div>{name}</div>
          <div>
            {console.log(groupBy(branchesState.series, 'team'))}
            {console.log(branchesState.series)}
          </div>
          {groupBy(branchesState.series, 'team')[name].map((e, i) => {
            return (
              <div key={i} style={{ display: 'flex' }}>
                <p>{e.name}</p>
                <p>{e.last_started}</p>
                <p>{e.builds}</p>
              </div>
            );
          })}
        </div>
      ) : !branchesState || loadingState ? (
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
                return <Card team={element[0]} series={element} key={index} />;
              }
            )}
            {/*
            {console.log(groupBy(branchesState.series, 'team'))}
            {console.log(branchesState.series)}
*/}
          </Fragment>
        </div>
      )}
    </main>
  );
};
export default Team;
