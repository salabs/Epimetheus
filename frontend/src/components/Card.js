import React from 'react';
import { useHistory } from 'react-router-dom';
import theme from '../theme';

const Card = ({ team, numberOfSeries }) => {
  let history = useHistory();
  return (
    <div
      style={theme.flexItem}
      onClick={() => history.push(`/team/${team}`)}
      role={'presentation'}
    >
      <h3>{team}</h3>
      <div>Number of series: {numberOfSeries}</div>
    </div>
  );
};

export default Card;
