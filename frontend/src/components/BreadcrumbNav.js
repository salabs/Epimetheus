import React from 'react';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
import { useStateValue } from '../contexts/state';

const BreadcrumbNav = buildId => {
  let url = useRouteMatch();
  let params = useParams();
  const [{ selectedBranchState }] = useStateValue();
  const { team, name } = selectedBranchState;
  return (
    <div>
      {console.log(url, params)}
      {console.log(selectedBranchState)}
      <Link to={`/team/${team}`}>{team}</Link> >{' '}
      <Link to={`/history/${params.buildId}/10`}>{name}</Link> >{' '}
      <div>{params.id}</div>
    </div>
  );
};

export default BreadcrumbNav;
