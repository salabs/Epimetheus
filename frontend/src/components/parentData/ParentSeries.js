import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { buildTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentSeries = () => {
    const { seriesId } = useParams();

    const [
        {
            parentData: { seriesData, buildData },
        },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/info?`;

        const fetchSeriesData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                const seriesData = json.series;
                dispatch({ type: 'setSeriesData', seriesData });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };

        fetchSeriesData();

        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'setSeriesData', undefined });
        };
    }, [dispatch, seriesId]);

    useEffect(() => {
        const fetchBuildData = async () => {
            const { last_build } = seriesData;
            const buildUrl = `/data/series/${seriesId}/builds/${last_build}/info?`;
            try {
                const res = await fetch(buildUrl);
                const json = await res.json();
                const buildData = json.build;
                dispatch({ type: 'setBuildData', buildData });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };

        seriesData && fetchBuildData();

        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'setBuildData', undefined });
        };
    }, [dispatch, seriesData, seriesId]);

    return <ParentTable data={buildData} types={buildTypes} />;
};

export default ParentSeries;
