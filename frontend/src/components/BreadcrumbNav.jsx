import React from 'react';
import { useStateValue } from '../contexts/state';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { BreadcrumbList } from './BreadcrumbNav.styles';

const LinkItem = props => {
    const { to, id, ariaLabel, name, first } = props.link;
    const { current } = props;

    return (
        <li>
            {!first && <span aria-hidden="true">/</span>}
            <Link
                to={to}
                id={id}
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
    const { name, series, seriesId, buildId, suiteId } = useParams();
    const [{ selectedBranchState }] = useStateValue();
    const teamName = name || selectedBranchState.team;
    const seriesName = series || selectedBranchState.id;

    const links = new Map();
    links
        .set('teams', {
            to: `/team`,
            id: 'Teams',
            name: 'Teams',
            first: true,
        })
        .set('team', {
            to: `/team/${teamName}`,
            id: 'TeamBreadCrumb',
            name: teamName,
        })
        .set('series', {
            to: `/series/${seriesName}/overview`,
            id: 'SeriesBreadCrumb',
            ariaLabel: `series ${selectedBranchState.name}`,
            name: selectedBranchState.name,
        })
        .set('build', {
            to: `/series/${seriesId}/build/${buildId}/overview`,
            id: 'BuildBreadCrumb',
            ariaLabel: `build id ${buildId}`,
            name: buildId,
        })
        .set('suite', {
            to: `/series/${seriesId}/build/${buildId}/suite/${suiteId}/history`,
            id: 'SuiteBreadCrumb',
            ariaLabel: `suite id ${suiteId}`,
            name: suiteId,
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

export default BreadcrumbNav;
