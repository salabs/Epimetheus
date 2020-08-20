// eslint-disable-next-line
import React from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbContainer = styled.div`
    font-size: 14px;
`;

const StyledInnerDiv = styled.div`
    display: inline;
`;

const StyledLink = styled(Link)`
    padding: 5px 5px 5px 10px;
    &:hover,
    &:active {
        background-color: #ccc;
        transition: 0.1s background-color;
    }
`;

const SeriesLink = styled(StyledLink)`
    padding-left: 0 !important;
`;

const BreadcrumbItem = () => {
    const { name } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const teamName = name || selectedBranchState.team;

    return (
        <SeriesLink
            to={`/team/${teamName}`}
            className="BreadCrumbSeries"
            id="TeamBreadCrumb"
        >
            {teamName}
        </SeriesLink>
    );
};

const BreadcrumbItemSeries = () => {
    const { series } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const seriesId = series || selectedBranchState.id;
    return (
        <StyledInnerDiv>
            <BreadcrumbItem /> &gt;
            <StyledLink
                to={`/series/${seriesId}/overview`}
                id="SeriesBreadCrumb"
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
            <BreadcrumbItemSeries /> &gt;
            <StyledLink
                to={`/series/${seriesId}/build/${buildId}/overview`}
                id="BuildBreadCrumb"
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
            <BreadcrumbItemBuild /> &gt; <span id="SuiteBreadCrumb">{suiteId}</span>
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
        <BreadcrumbContainer id="breadCrumbNav">
            <StyledInnerDiv>{BREADCRUMB_STATUS[`${status}`]}</StyledInnerDiv>
        </BreadcrumbContainer>
    );
};

export default BreadcrumbNav;
