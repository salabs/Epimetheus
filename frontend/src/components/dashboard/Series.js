import React from 'react';
import SuiteInstability from '../../components/graphs/SuiteInstability';
import TimeLineChart from '../../components/graphs/TimeLineChart';
import DashboardList from '../dashlist/ListMain';

const Series = () => {
    return (
        <>
            <TimeLineChart />
            <SuiteInstability />
            <div className="dashboard-list">
                <DashboardList />
            </div>
        </>
    );
};

export default Series;
