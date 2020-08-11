import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Build from '../components/dashboard/Build';
import Series from '../components/dashboard/Series';
import ParentSeries from '../components/parentData/ParentSeries';
import ParentBuild from '../components/parentData/ParentBuild';
import styled from 'styled-components';

const ParentInfo = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 20px 0;
`;
const SeriesInfo = styled.div`
    padding-bottom: 45px;
`;

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Dashboard = () => {
    const [t] = useTranslation(['parentData']);

    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    return (
        <main>
            <BreadcrumbNav status={status} />
            <div>
                <ParentInfo id="parentInfo-container">
                    {!buildUrl ? (
                        <SeriesInfo id="series-info-container">
                            <h3>{t('title')}</h3>
                            <ParentSeries />
                        </SeriesInfo>
                    ) : (
                        <ParentBuild />
                    )}
                </ParentInfo>
                <FlexDiv>
                    {buildUrl ? (
                        <React.Fragment>
                            <Build />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Series />
                        </React.Fragment>
                    )}
                </FlexDiv>
            </div>
        </main>
    );
};

export default Dashboard;
