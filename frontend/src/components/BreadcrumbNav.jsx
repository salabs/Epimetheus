import React from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import {
    BreadcrumbContainer,
    StyledInnerDiv,
    StyledLink,
    TeamsLink,
} from './BreadcrumbNav.styles';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';

const BreadcrumbTeams = () => {
    return (
        <li>
            <TeamsLink to={`/team`}>Teams</TeamsLink>
        </li>
    );
};

const BreadcrumbItemTeam = props => {
    const { name } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const teamName = name || selectedBranchState.team;
    return (
        <React.Fragment>
            <BreadcrumbTeams />
            <li>
                <span>/</span>
                <StyledLink
                    aria-current={props.current ? 'page' : false}
                    to={`/team/${teamName}`}
                    className="TeamBreadCrumb"
                    id="TeamBreadCrumb"
                >
                    {teamName}
                </StyledLink>
            </li>
        </React.Fragment>
    );
};

const BreadcrumbItemSeries = props => {
    const { series } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const seriesId = series || selectedBranchState.id;
    return (
        <React.Fragment>
            <BreadcrumbItemTeam />
            <li>
                <span>/</span>
                <StyledLink
                    aria-current={props.current ? 'page' : false}
                    to={`/series/${seriesId}/overview`}
                    id="SeriesBreadCrumb"
                    className="SeriesBreadCrumb"
                    aria-label={'series: ' + selectedBranchState.name}
                >
                    {selectedBranchState.name}
                </StyledLink>
            </li>
        </React.Fragment>
    );
};

const BreadcrumbItemBuild = props => {
    const { buildId, seriesId } = useParams();
    return (
        <React.Fragment>
            <BreadcrumbItemSeries />
            <li>
                <span>/</span>
                <StyledLink
                    aria-current={props.current ? 'page' : false}
                    to={`/series/${seriesId}/build/${buildId}/overview`}
                    id="BuildBreadCrumb"
                    className="BuildBreadCrumb"
                    aria-label={`buildId ${buildId}`}
                >
                    {buildId}
                </StyledLink>
            </li>
        </React.Fragment>
    );
};

const BreadcrumbItemSuite = props => {
    const { seriesId, buildId, suiteId } = useParams();
    return (
        <React.Fragment>
            <BreadcrumbItemBuild />
            <li>
                <span>/</span>
                <StyledLink
                    aria-current={props.current ? 'page' : false}
                    to={`/series/${seriesId}/build/${buildId}/suite/${suiteId}/history`}
                    id="SuiteBreadCrumb"
                    className="SuiteBreadCrumb"
                    aria-label={`SuiteId ${suiteId}`}
                >
                    {suiteId}
                </StyledLink>
            </li>
        </React.Fragment>
    );
};

const BREADCRUMB_STATUS = {
    team: <BreadcrumbItemTeam current />,
    series: <BreadcrumbItemSeries current />,
    build: <BreadcrumbItemBuild current />,
    suite: <BreadcrumbItemSuite current />,
};

const BreadcrumbNav = ({ status }) => {
    return (
        <BreadcrumbContainer id={'breadCrumbNav'} status={status}>
            <ContainerGrid12>
                <ContentGrid6>
                    <nav aria-label="Breadcrumb">
                        <StyledInnerDiv>
                            {BREADCRUMB_STATUS[`${status}`]}
                        </StyledInnerDiv>
                    </nav>
                </ContentGrid6>
            </ContainerGrid12>
        </BreadcrumbContainer>
    );
};

export default BreadcrumbNav;
