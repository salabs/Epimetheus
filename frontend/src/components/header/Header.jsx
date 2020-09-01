import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { LinkContainer, OverviewLink, HistoryLink } from './Header.styles';

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
            return `${t('suite')} ${name} ${t('in')} ${t('build')} ${
                buildData.build_number
            } ${t('from')} ${t('series')} ${buildData.name}`;
        }
    };

    const formSeriesHeader = () => {
        if (seriesData) {
            const { name } = seriesData;
            return `${t('Series')} ${name}`;
        }
    };

    const formBuildHeader = () => {
        if (buildData) {
            const { name, build_number } = buildData;
            return `${t('Build')} ${build_number} ${t('from')} ${t(
                'series'
            )} ${name}`;
        }
    };

    const formHeader = () => {
        return suiteUrl
            ? formSuiteHeader()
            : buildUrl
            ? formBuildHeader()
            : formSeriesHeader();
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
