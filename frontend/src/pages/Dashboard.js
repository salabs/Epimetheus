﻿import React from 'react';
import { useLocation } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SuiteInstability from '../components/graphs/SuiteInstability';
import StatusCount from '../components/graphs/StatusCount';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { useStateValue } from '../contexts/state';
import { suiteLabels, testLabels } from '../utils/graphTypes';
import ParentSeries from '../components/parentData/ParentSeries';
import ParentBuild from '../components/parentData/ParentBuild';

const Dashboard = () => {
    const [{ loadingState }] = useStateValue();

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
        }
    `;

    return (
        <main css={dashBoardStyles}>
            <BreadcrumbNav status={status} />
            <div>
                {!loadingState && (
                    <div className="parentInfo-container">
                        {buildUrl ? <ParentBuild /> : <ParentSeries />}
                    </div>
                )}
                {buildUrl && (
                    <div className="pieContainer">
                        <StatusCount labels={suiteLabels} />{' '}
                        <StatusCount labels={testLabels} />
                    </div>
                )}
                <SuiteInstability />
            </div>
        </main>
    );
};

export default Dashboard;
