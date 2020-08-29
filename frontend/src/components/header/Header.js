import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';

const LinkContainer = styled.div`
    padding: 10px 0;

    a:nth-child(2) {
        margin-left: 10px;
    }
`;

// eslint-disable-next-line no-unused-vars
const StyledLink = styled(({ overview, ...props }) => <NavLink {...props} />)`
    width: 100px;
    margin: 10px 15px 10px 0;
    cursor: pointer;
    color: var(--titan-green);
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
`;

const OverviewLink = styled(StyledLink)`
    color: ${props => props.overview && 'var(--pirlo-blue) !important'};
    border-bottom: ${props => props.overview && '4px solid var(--pirlo-blue)'};
`;

const HistoryLink = styled(StyledLink)`
    color: ${props => !props.overview && 'var(--pirlo-blue) !important'};
    border-bottom: ${props => !props.overview && '4px solid var(--pirlo-blue)'};
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
        if (buildData) {
            return `${t('history')} ${t('suite')} ${name} ${t('in')} ${t(
                'build'
            )} ${buildData.build_number} ${t('from')} ${buildData.name}`;
        }
    };

    const formSeriesHeader = view => {
        if (seriesData) {
            const { name } = seriesData;
            return `${view} ${t('series')} ${name}`;
        }
    };

    const formBuildHeader = view => {
        if (buildData) {
            const { name, build_number } = buildData;
            return `${view} ${t('build')} ${build_number} ${t('from')} ${name}`;
        }
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
                    <h1 id="siteHeader">{formHeader()}</h1>
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
