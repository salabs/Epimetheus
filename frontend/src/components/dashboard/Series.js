import React from 'react';
import SuiteInstability from '../../components/graphs/SuiteInstability';
import TimeLineChart from '../../components/graphs/TimeLineChart';

const Series = () => {
    return (
        <>
            <TimeLineChart />
            <SuiteInstability />
        </>
    );
};

export default Series;
