/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import KeywordAnalysisTable from '../components/dashlist/KeywordAnalysisTable';
import ParentBuild from '../components/parentData/ParentBuild';
import ContentHeader from '../components/header/ContentHeader';
import { ParentInfo } from './Overview.styles';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';

const Overview = () => {
    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    return (
        <main>
            <BreadcrumbNav status={status} />
            <ContentHeader />
            <div>
                <ParentInfo id="parentInfo-container">
                    <ContainerGrid12>
                        <ContentGrid6>
                            <ParentBuild />
                        </ContentGrid6>
                    </ContainerGrid12>
                </ParentInfo>
                <ContainerGrid12>
                    <h3>Statistics on keyword execution times</h3>
                </ContainerGrid12>
                <React.Fragment>
                    <KeywordAnalysisTable />
                </React.Fragment>
            </div>
        </main>
    );
};

export default Overview;
