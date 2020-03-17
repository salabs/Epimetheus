import React from 'react';
import FA from 'react-fontawesome';
import NotFound from './NotFound';
import { useHistory } from 'react-router-dom';
import theme from '../theme';

const SelectedTeam = ({ selectedTeam }) => {
  let history = useHistory();

  const flexContainer = {
    display: 'flex',
    flexWrap: 'wrap'
  };
  const cardItem = {
    display: 'block'
  };
  return (
    <main id="selectedTeam" css={theme.loadingState}>
      {selectedTeam !== null ? (
        <div style={flexContainer}>
          <div
            style={theme.flexItem}
            onClick={() =>
              history.push(`/history/${selectedTeam.all_builds.id}/10`)
            }
            role={'presentation'}
          >
            <h3>{selectedTeam.all_builds.name}</h3>
            <hr />
            <div style={cardItem}>
              <div>
                <FA name="clock-o" />{' '}
                {selectedTeam.all_builds.last_started.slice(0, 16)}
              </div>
              <div>
                <FA name="hashtag" /> {selectedTeam.all_builds.last_build}
              </div>
            </div>
          </div>
          {selectedTeam.series.reverse().map((element, i) => {
            return (
              <div
                style={theme.flexItem}
                key={i}
                onClick={() => history.push(`/history/${element.id}/10`)}
                role={'presentation'}
              >
                <h3>{element.name}</h3>
                <hr />
                <div style={cardItem}>
                  <div>
                    <FA name="clock-o" /> {element.last_started.slice(0, 16)}
                  </div>
                  <div>
                    <FA name="hashtag" /> {element.last_build}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

export default SelectedTeam;
