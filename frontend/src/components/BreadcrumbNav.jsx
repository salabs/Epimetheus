import React from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import { BreadcrumbContainer, StyledInnerOl } from './BreadcrumbNav.styles';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { Link } from 'react-router-dom';

const BreadcrumbTeams = () => {
    return (
        <li>
            <Link to={`/team`}>Teams</Link>
        </li>
    );
};

const BreadcrumbItemTeam = props => {
    const { name } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const teamName = name || selectedBranchState.team;
    return (
        <>
            <BreadcrumbTeams />
            <li>
                <span aria-hidden="true">/</span>
                <Link
                    to={`/team/${teamName}`}
                    id="TeamBreadCrumb"
                    className={props.current ? 'active' : ''}
                    aria-current={props.current ? 'page' : false}
                >
                    {teamName}
                </Link>
            </li>
        </>
    );
};

const BreadcrumbItemSeries = props => {
    const { series } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const seriesId = series || selectedBranchState.id;
    return (
        <>
            <BreadcrumbItemTeam />
            <li>
                <span aria-hidden="true">/</span>
                <Link
                    to={`/series/${seriesId}/overview`}
                    id="SeriesBreadCrumb"
                    className={props.current ? 'active' : ''}
                    aria-label={'series: ' + selectedBranchState.name}
                    aria-current={props.current ? 'page' : false}
                >
                    {selectedBranchState.name}
                </Link>
            </li>
        </>
    );
};

const BreadcrumbItemBuild = props => {
    const { buildId, seriesId } = useParams();
    return (
        <>
            <BreadcrumbItemSeries />
            <li>
                <span aria-hidden="true">/</span>
                <Link
                    to={`/series/${seriesId}/build/${buildId}/overview`}
                    id="BuildBreadCrumb"
                    className={props.current ? 'active' : ''}
                    aria-label={`buildId ${buildId}`}
                    aria-current={props.current ? 'page' : false}
                >
                    {buildId}
                </Link>
            </li>
        </>
    );
};

const BreadcrumbItemSuite = props => {
    const { seriesId, buildId, suiteId } = useParams();
    return (
        <>
            <BreadcrumbItemBuild />
            <li>
                <span aria-hidden="true">/</span>
                <Link
                    to={`/series/${seriesId}/build/${buildId}/suite/${suiteId}/history`}
                    id="SuiteBreadCrumb"
                    className={props.current ? 'active' : ''}
                    aria-label={`suiteId ${suiteId}`}
                    aria-current={props.current ? 'page' : false}
                >
                    {suiteId}
                </Link>
            </li>
        </>
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
        <ContainerGrid12>
            <ContentGrid6>
                <BreadcrumbContainer
                    id={'breadCrumbNav'}
                    status={status}
                    aria-label="Breadcrumb"
                >
                    <StyledInnerOl>
                        {BREADCRUMB_STATUS[`${status}`]}
                    </StyledInnerOl>
                </BreadcrumbContainer>
            </ContentGrid6>
        </ContainerGrid12>
    );
};

export default BreadcrumbNav;
