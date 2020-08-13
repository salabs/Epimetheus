﻿import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';

const LinkContainer = styled.div`
    padding: 10px 0;
`;

const StyledLink = styled(NavLink)`
    border: 1px solid #eee;
    width: 100px;
    border-radius: 10px;
    background-color: var(--nero-white);
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    color: var(--gradient-black) !important;
    text-decoration: none;
`;

const DashBoardLink = styled(StyledLink)`
    border: ${props =>
        props.dashboardUrl
            ? '2px solid var(--gradient-black) !important'
            : '1px solid #eee'};
    background-color: ${props =>
        props.dashboardUrl ? 'transparent !important' : 'var(--nero-white)'};
`;

const HistoryLink = styled(StyledLink)`
    border: ${props =>
        props.dashboardUrl
            ? '1px solid #eee'
            : '2px solid var(--gradient-black) !important'};
    background-color: ${props =>
        props.dashboardUrl ? 'var(--nero-white)' : 'transparent !important'};
`;

const Header = () => {
    const [t] = useTranslation(['header']);

    const pathname = useLocation().pathname;

    const dashboardUrl = pathname.includes('dashboard');
    const buildUrl = pathname.includes('build');

    const [
        {
            parentData: { seriesData, buildData },
        },
    ] = useStateValue();

    const formSeriesHeader = view => {
        if (seriesData) {
            const { name } = seriesData;
            return `${view} ${t('series')} ${name}`;
        }
    };

    const formBuildHeader = view => {
        const { name, build_number } = buildData;
        return `${view} ${t('build')} ${build_number} ${t('from')} ${name}`;
    };

    const formHeader = () => {
        const view = dashboardUrl ? `${t('overview')}` : `${t('history')}`;
        return buildUrl ? formBuildHeader(view) : formSeriesHeader(view);
    };

    const correctUrl = prop => {
        if (pathname.includes(prop)) {
            return pathname;
        }
        const beginningUrl = pathname.substring(0, pathname.lastIndexOf('/'));
        return beginningUrl.concat('/' + prop);
    };

    return (
        <>
            {(seriesData || buildData) && (
                <>
                    <h1>{formHeader()}</h1>
                    <LinkContainer>
                        <DashBoardLink
                            to={correctUrl('dashboard')}
                            dashboardUrl={dashboardUrl}
                        >
                            Dashboard
                        </DashBoardLink>
                        <HistoryLink
                            to={correctUrl('history')}
                            dashboardUrl={dashboardUrl}
                        >
                            History
                        </HistoryLink>
                    </LinkContainer>
                </>
            )}
        </>
    );
};

export default Header;
