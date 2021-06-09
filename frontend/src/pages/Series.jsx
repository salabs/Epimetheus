import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import SeriesOverview from '../components/overview/series/SeriesOverview';
import SeriesHistory from '../components/history/series/SeriesHistory';
import useCurrentSeries from '../hooks/useCurrentSeries';

const Series = () => {
    const pathname = useLocation().pathname;
    const overviewUrl = pathname.includes('overview');
    const currentSeries = useCurrentSeries();

    return currentSeries ? (
        overviewUrl ? (
            <SeriesOverview currentSeries={currentSeries} />
        ) : (
            <SeriesHistory currentSeries={currentSeries} />
        )
    ) : (
        <Loading />
    );
};

export default Series;
