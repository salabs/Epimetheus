import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { ContainerGrid12, ContentGrid6 } from '../../styles/baseComponents';
import Tab from '../tablist/Tab';

const ContentHeader = () => {
    const [t] = useTranslation(['header']);

    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');
    const suiteUrl = pathname.includes('suite');

    const [
        {
            amountOfBuilds,
            offset,
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
        const offsetUrl = offset > 0 && '&offset=' + offset;
        const numberOfBuildsUrl = 'numberofbuilds=' + amountOfBuilds;
        return offsetUrl
            ? beginningUrl.concat(
                  '/' + prop + '?' + numberOfBuildsUrl + offsetUrl
              )
            : beginningUrl.concat('/' + prop + '?' + numberOfBuildsUrl);
    };

    const tabLinks = [
        { to: correctUrl('overview'), translation: t('buttons.overview') },
        { to: correctUrl('history'), translation: t('buttons.history') },
    ];
    if (buildUrl) {
        tabLinks.push({
            to: correctUrl('analysis'),
            translation: t('buttons.analysis'),
        });
    }

    return (
        <>
            {(seriesData || buildData) && (
                <>
                    <ContainerGrid12>
                        <ContentGrid6>
                            <h1 id="siteHeading">{formHeader()}</h1>
                        </ContentGrid6>
                    </ContainerGrid12>
                    {!selectedSuiteState && <Tab tabLinks={tabLinks} />}
                </>
            )}
        </>
    );
};

export default ContentHeader;
