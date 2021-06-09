import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import BuildHistory from '../components/history/build/BuildHistory';
import BuildOverview from '../components/overview/build/BuildOverview';
import useCurrentSeries from '../hooks/useCurrentSeries';

const Build = () => {
    const pathname = useLocation().pathname;
    const overviewUrl = pathname.includes('overview');
    const currentSeries = useCurrentSeries();

    return currentSeries ? (
        overviewUrl ? (
            <BuildOverview currentSeries={currentSeries} />
        ) : (
            <BuildHistory currentSeries={currentSeries} />
        )
    ) : (
        <Loading />
    );
};

export default Build;
