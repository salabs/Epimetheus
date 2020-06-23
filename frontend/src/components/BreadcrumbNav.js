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

    return (
        <Link to={`/team/${teamName}`} className="BreadCrumbSeries">
            {teamName}
        </Link>
    );
};

const BreadcrumbItemSeries = () => {
    const { series } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const seriesId = series || selectedBranchState.id;
    return (
        <div>
            <BreadcrumbItem /> &gt;
            <Link to={`/series/${seriesId}/history`}>
                {selectedBranchState.name}
            </Link>
        </div>
    );
};

const BreadcrumbItemBuild = () => {
    const { buildId, seriesId } = useParams();
    return (
        <div>
            <BreadcrumbItemSeries /> &gt;
            <Link to={`/series/${seriesId}/build/${buildId}/history`}>
                {buildId}
            </Link>
        </div>
    );
};

const BreadcrumbItemSuite = () => {
    const { suiteId } = useParams();
    return (
        <div>
            <BreadcrumbItemBuild /> &gt; {suiteId}
        </div>
    );
};

const BreadcrumbCompare = () => {
    return (
        <Link to={'/compare'}>
            Compare
        </Link>
    );
}

const BreadcrumbNav = ({ status }) => {
    const breadCrumbNavStyles = css`
        font-size: 14px;
        a {
            padding: 5px 5px 5px 10px;
            &:hover,
            &:active {
                background-color: #ccc;
                transition: 0.1s background-color;
            }
        }
        .BreadCrumbSeries {
            padding-left: 0;
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
    suite: <BreadcrumbItemSuite />,
    compare: <BreadcrumbCompare />
};
