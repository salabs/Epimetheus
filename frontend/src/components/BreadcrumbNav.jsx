import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { BreadcrumbList } from './BreadcrumbNav.styles';
import { StateContext } from '../contexts/state';

const LinkItem = props => {
    const { to, id, robot_id, ariaLabel, name } = props.link;
    const { current } = props;

    return (
        <li>
            <Link
                to={to}
                id={id}
                robot_id={robot_id}
                className={current ? 'active' : ''}
                aria-current={current ? 'page' : false}
                aria-label={ariaLabel}
            >
                {name}
            </Link>
        </li>
    );
};

const ListItems = ({ status }) => {
    const {
        name,
        series,
        seriesId,
        buildId,
        suiteId,
        seriesId2,
        buildId2,
    } = useParams();

    const { state } = useContext(StateContext);
    const { selectedSeriesState } = state;

    const teamName = name || selectedSeriesState.team;
    const seriesName = series || selectedSeriesState.id;

    const links = new Map();
    links
        .set('teams', {
            to: `/team`,
            id: 'Teams',
            name: 'Teams',
        })
        .set('team', {
            to: `/team/${teamName}`,
            robot_id: 'TeamBreadCrumb',
            id: 'TeamBreadCrumb',
            name: teamName,
        })
        .set('series', {
            to: `/team/${teamName}/series/${seriesName}/overview`,
            robot_id: 'SeriesBreadCrumb',
            id: 'SeriesBreadCrumb',
            ariaLabel: `${selectedSeriesState.name}: series' name`,
            name: selectedSeriesState.name,
        })
        .set('build', {
            to: `/team/${teamName}/series/${seriesId}/build/${buildId}/overview`,
            robot_id: 'BuildBreadCrumb',
            id: 'BuildBreadCrumb',
            ariaLabel: `${buildId}: build's id`,
            name: buildId,
        })
        .set('suite', {
            to: `/team/${teamName}/series/${seriesId}/build/${buildId}/suite/${suiteId}/history`,
            robot_id: 'SuiteBreadCrumb',
            id: 'SuiteBreadCrumb',
            ariaLabel: `${suiteId}: suite's id`,
            name: suiteId,
        })
        .set('compare', {
            to: `/compare`,
            robot_id: 'CompareBreadCrumb',
            id: 'CompareBreadCrumb',
            name: 'Compare',
        })
        .set('compareBuilds', {
            to: `/compare/${seriesId}/${buildId}/to/${seriesId2}/${buildId2}`,
            robot_id: 'CompareBuildsBreadCrumb',
            id: 'CompareBuildsBreadCrumb',
            name: `Compare series ${seriesId} build ${buildId} to series ${seriesId2} build ${buildId2}`,
        });

    const breadcrumbArray = [];
    switch (status) {
        case 'team':
            breadcrumbArray.push(
                <LinkItem key="teams" link={links.get('teams')} />,
                <LinkItem key="team" link={links.get('team')} current />
            );
            break;
        case 'series':
            breadcrumbArray.push(
                <LinkItem key="teams" link={links.get('teams')} />,
                <LinkItem key="team" link={links.get('team')} />,
                <LinkItem key="series" link={links.get('series')} current />
            );
            break;
        case 'build':
            breadcrumbArray.push(
                <LinkItem key="teams" link={links.get('teams')} />,
                <LinkItem key="team" link={links.get('team')} />,
                <LinkItem key="series" link={links.get('series')} />,
                <LinkItem key="build" link={links.get('build')} current />
            );
            break;
        case 'suite':
            breadcrumbArray.push(
                <LinkItem key="teams" link={links.get('teams')} />,
                <LinkItem key="team" link={links.get('team')} />,
                <LinkItem key="series" link={links.get('series')} />,
                <LinkItem key="build" link={links.get('build')} />,
                <LinkItem key="suite" link={links.get('suite')} current />
            );
            break;
        case 'compare':
            breadcrumbArray.push(
                <LinkItem key="compare" link={links.get('compare')} />,
                <LinkItem
                    key="compareBuilds"
                    link={links.get('compareBuilds')}
                    current
                />
            );
            break;
        default:
            breadcrumbArray.push('');
    }

    return breadcrumbArray;
};

const BreadcrumbNav = ({ status }) => {
    return (
        <ContainerGrid12>
            <ContentGrid6>
                <BreadcrumbList
                    id={'breadCrumbNav'}
                    status={status}
                    aria-label="Breadcrumb"
                >
                    <ListItems status={status} />
                </BreadcrumbList>
            </ContentGrid6>
        </ContainerGrid12>
    );
};

LinkItem.propTypes = {
    link: PropTypes.shape({
        to: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        ariaLabel: PropTypes.string,
        name: PropTypes.string, // is actually required, but gives an error on the first time due to 'data' being undefined
    }),
    current: PropTypes.bool,
};

ListItems.propTypes = {
    status: PropTypes.string.isRequired,
};

BreadcrumbNav.propTypes = {
    status: PropTypes.string.isRequired,
};

export default BreadcrumbNav;
