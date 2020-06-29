import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { seriesTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentSeries = () => {
    const { seriesId } = useParams();

    const [
        {
            parentData: { seriesData },
        },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/info?`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                const seriesData = json.series;
                dispatch({ type: 'setSeriesData', seriesData });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [seriesId, dispatch]);

    return <ParentTable data={seriesData} types={seriesTypes} />;
};

export default ParentSeries;
