import React from 'react';
import { useLocation } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import SuiteInstability from '../components/graphs/SuiteInstability';
import StatusCount from '../components/graphs/StatusCount';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { suiteLabels, testLabels } from '../utils/graphTypes';

const Dashboard = () => {
    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    const dashBoardStyles = css`
        .pieContainer {
            padding: 20px;
            display: flex;
            flex-wrap: wrap;
        }
    `;

    return (
        <main css={dashBoardStyles}>
            <BreadcrumbNav status={status} />
            {buildUrl && (
                <div className="pieContainer">
                    <StatusCount labels={suiteLabels} />{' '}
                    <StatusCount labels={testLabels} />
                    {/* <SuiteInstability /> */}
                </div>
            )}
        </main>
    );
};

export default Dashboard;
