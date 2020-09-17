// eslint-disable-next-line
import React from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import {
    BreadcrumbContainer,
    StyledInnerDiv,
    StyledLink,
    TeamsLink,
} from './BreadcrumbNav.styles';

const BreadcrumbTeams = () => {
    return <TeamsLink to={`/team`}>Teams</TeamsLink>;
};

const BreadcrumbItem = () => {
    const { name } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const teamName = name || selectedBranchState.team;

    return (
        <StyledInnerDiv>
            <BreadcrumbTeams /> /
            <StyledLink
                to={`/team/${teamName}`}
                className="TeamBreadCrumb"
                id="TeamBreadCrumb"
            >
                {teamName}
            </StyledLink>
        </StyledInnerDiv>
    );
};

const BreadcrumbItemSeries = () => {
    const { series } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const seriesId = series || selectedBranchState.id;
    return (
        <StyledInnerDiv>
            <BreadcrumbItem /> /
            <StyledLink
                to={`/series/${seriesId}/overview`}
                id="SeriesBreadCrumb"
                className="SeriesBreadCrumb"
            >
                {selectedBranchState.name}
            </StyledLink>
        </StyledInnerDiv>
    );
};

const BreadcrumbItemBuild = () => {
    const { buildId, seriesId } = useParams();
    return (
        <StyledInnerDiv>
            <BreadcrumbItemSeries /> /
            <StyledLink
                to={`/series/${seriesId}/build/${buildId}/overview`}
                id="BuildBreadCrumb"
                className="BuildBreadCrumb"
            >
                {buildId}
            </StyledLink>
        </StyledInnerDiv>
    );
};

const BreadcrumbItemSuite = () => {
    const { suiteId } = useParams();
    return (
        <StyledInnerDiv>
            <BreadcrumbItemBuild /> /{' '}
            <span id="SuiteBreadCrumb">{suiteId}</span>
        </StyledInnerDiv>
    );
};

const BREADCRUMB_STATUS = {
    team: <BreadcrumbItem />,
    series: <BreadcrumbItemSeries />,
    build: <BreadcrumbItemBuild />,
    suite: <BreadcrumbItemSuite />,
};

const BreadcrumbNav = ({ status }) => {
    return (
        <BreadcrumbContainer id="breadCrumbNav" status={status}>
            <StyledInnerDiv>{BREADCRUMB_STATUS[`${status}`]}</StyledInnerDiv>
        </BreadcrumbContainer>
    );
};

export default BreadcrumbNav;
