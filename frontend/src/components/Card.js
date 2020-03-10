import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';

const Card = ({ team, numberOfSeries, lastRun }) => {
  return (
    <div
      style={{
        flexBasis: '21%',
        boxShadow: '0 3px 4px rgba(0,0,0,0.16), 0 3px 4px rgba(0,0,0,0.23)',
        margin: '10px',
        padding: '10px',
        minHeight: '20vh'
      }}
    >
      <Link to={`/team/${team}`}>{team}</Link>
      <div>Number of series: {numberOfSeries}</div>
      <div>
        Latest run series: <b>{lastRun.name}</b> on{' '}
        <b>{lastRun.last_started}</b>
      </div>
    </div>
  );
};

export default Card;
