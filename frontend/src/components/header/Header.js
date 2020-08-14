import React from 'react';
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
    margin: 5px 10px 5px 0;
    cursor: pointer;
    color: var(--gradient-black) !important;
    text-decoration: none;
`;

const OverviewLink = styled(StyledLink)`
    border: ${props =>
        props.overview
            ? '2px solid var(--gradient-black) !important'
            : '1px solid #eee'};
    background-color: ${props =>
        props.overview ? 'transparent !important' : 'var(--nero-white)'};
`;

const HistoryLink = styled(StyledLink)`
    border: ${props =>
        props.overview
            ? '1px solid #eee'
            : '2px solid var(--gradient-black) !important'};
    background-color: ${props =>
        props.overview ? 'var(--nero-white)' : 'transparent !important'};
`;

const Header = () => {
    const [t] = useTranslation(['header']);

    const pathname = useLocation().pathname;
    const overviewUrl = pathname.includes('overview');
    const buildUrl = pathname.includes('build');
    const suiteUrl = pathname.includes('suite');

    const [
        {
            parentData: { seriesData, buildData },
            selectedSuiteState,
        },
    ] = useStateValue();

    const formSuiteHeader = () => {
        const {
            suite: { name },
        } = selectedSuiteState;

        return `${t('history')} ${t('suite')} ${name} ${t('in')} ${t(
            'build'
        )} ${buildData.build_number} ${t('from')} ${buildData.name}`;
    };

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
        const view = overviewUrl ? `${t('overview')}` : `${t('history')}`;
        return suiteUrl
            ? formSuiteHeader()
            : buildUrl
            ? formBuildHeader(view)
            : formSeriesHeader(view);
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
                    {!selectedSuiteState && (
                        <LinkContainer>
                            <OverviewLink
                                to={correctUrl('overview')}
                                overview={overviewUrl}
                            >
                                {t('buttons.overview')}
                            </OverviewLink>
                            <HistoryLink
                                to={correctUrl('history')}
                                overview={overviewUrl}
                            >
                                {t('buttons.history')}
                            </HistoryLink>
                        </LinkContainer>
                    )}
                </>
            )}
        </>
    );
};

export default Header;
