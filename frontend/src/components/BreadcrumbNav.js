// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const BreadcrumbItem = () => {
    const { name } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const teamName = name || selectedBranchState.team;

    return <Link to={`/team/${teamName}`}>{teamName}</Link>;
};

const BreadcrumbItemSeries = () => {
    const { series } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const seriesId = series || selectedBranchState.id;
    return (
        <div>
            <BreadcrumbItem />>
            <Link to={`/history/${seriesId}/10`}>
                {selectedBranchState.name}
            </Link>
        </div>
    );
};

const BreadcrumbItemBuild = () => {
    const { buildId, seriesId } = useParams();
    return (
        <div>
            <BreadcrumbItemSeries />>
            <Link to={`/build/${buildId}/series/${seriesId}`}>{buildId}</Link>
        </div>
    );
};


const BreadcrumbItemSuite = () => {
    const { suiteId } = useParams();
    return (
        <div>
            <BreadcrumbItemBuild /> > {suiteId}
        </div>
    );
};
const BreadcrumbNav = ({ status }) => {
    const breadCrumbNavStyles = css`
        a {
            padding: 5px;
            &:hover,
            &:active {
                background-color: #ccc;
                transition: 0.1s background-color;
            }
        }
        div {
            display: inline;
        }
    `;

    return (
        <div css={breadCrumbNavStyles}>
            <div>{BREADCRUMB_STATUS[`${status}`]}</div>
        </div>
    );
};

export default BreadcrumbNav;

const BREADCRUMB_STATUS = {
    team: <BreadcrumbItem />,
    series: <BreadcrumbItemSeries />,
    build: <BreadcrumbItemBuild />,
    suite: <BreadcrumbItemSuite />
};

