import React from 'react';
import { filterStyles } from '../styles/commonStyles';
import FA from 'react-fontawesome';

const SelectedTeam = ({ name, series }) => {
  return (
    <main id="selectedTeam" css={filterStyles}>
      <h1>{name}</h1>
      {series.map((element, i) => {
        return (
          <div
            style={{
              flexBasis: '21%',
              boxShadow:
                '0 3px 4px rgba(0,0,0,0.16), 0 3px 4px rgba(0,0,0,0.23)',
              margin: '10px',
              padding: '10px',
              minHeight: '20vh'
            }}
            key={i}
          >
            <h3>{element.name}</h3>
            <hr />
            <div style={{ display: 'block' }}>
              <div>
                Last imported <FA name="clock-o" /> {element.last_imported}
              </div>
              <div>
                Number of builds <FA name="hashtag" /> {element.last_build}
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default SelectedTeam;
