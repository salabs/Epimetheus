import React from 'react';
import FA from 'react-fontawesome';
import { css, jsx } from '@emotion/core';

const SelectedTeam = ({ name, series }) => {
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
    <main id="selectedTeam" css={filterStyles}>
      <h1>{name}</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {series.map((element, i) => {
          return (
            <div
              style={{
                flexBasis: '30%',
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
                  <FA name="clock-o" /> {element.last_imported}
                </div>
                <div>
                  <FA name="hashtag" /> {element.last_build}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default SelectedTeam;
