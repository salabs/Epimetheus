import React from 'react';
import { useLocation } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Build from '../components/dashboard/Build';
import Series from '../components/dashboard/Series';
import ParentSeries from '../components/parentData/ParentSeries';
import ParentBuild from '../components/parentData/ParentBuild';

const Dashboard = () => {
    const [t] = useTranslation(['parentData']);

    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    const dashBoardStyles = css`
        .pieContainer {
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
        }

        .parentInfo-container {
            display: flex;
            flex-flow: row wrap;
            padding: 20px 0;

            .series-info-container {
                padding-bottom: 45px;
            }
        }
    `;

    return (
        <main css={dashBoardStyles}>
            <BreadcrumbNav status={status} />
            <div>
                <div className="parentInfo-container">
                    {!buildUrl ? (
                        <div className="series-info-container">
                            <h3>{t('title')}</h3>
                            <ParentSeries />
                        </div>
                    ) : (
                        <ParentBuild />
                    )}
                </div>
                {buildUrl ? (
                    <div className="pieContainer">
                        <Build />
                    </div>
                ) : (
                    <div>
                        <Series />
                    </div>
                )}
                {/* <TimeLineChart />
                <SuiteInstability /> */}
            </div>
        </main>
    );
};

export default Dashboard;
