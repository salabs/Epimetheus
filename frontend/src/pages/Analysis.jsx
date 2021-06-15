import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import KeywordAnalysisTable from '../components/history/build/keywordAnalysisTable/KeywordAnalysisTable';
import ParentBuild from '../components/parentData/ParentBuild';
import ContentHeader from '../components/header/ContentHeader';
import { useTranslation } from 'react-i18next';
import { ParentInfo } from '../styles/baseComponents';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';

const Overview = () => {
    const [t] = useTranslation(['analysis']);
    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    return (
        <>
            <BreadcrumbNav status={status} />
            <ContentHeader />
            <ParentInfo id="parentInfo-container">
                <ContainerGrid12>
                    <ContentGrid6>
                        <ParentBuild />
                    </ContentGrid6>
                </ContainerGrid12>
            </ParentInfo>
            <ContainerGrid12>
                <ContentGrid6>
                    <h2>{t('title')}</h2>
                    <KeywordAnalysisTable />
                </ContentGrid6>
            </ContainerGrid12>
        </>
    );
};

export default Overview;
