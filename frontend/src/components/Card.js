import React from 'react';
import { css } from '@emotion/core';

const Card = ({ series }) => {
  return (
    <div
      style={{
        flexBasis: '21%',
        boxShadow: '0 3px 4px rgba(0,0,0,0.16), 0 3px 4px rgba(0,0,0,0.23)',
        margin: '10px',
        padding: '10px'
      }}
    >
      {console.log(series)}
      <div>{series.id}</div>
      <div>{series.name}</div>
      <div>{series.team}</div>
      <div>{series.last_started}</div>
    </div>
  );
};

export default Card;
