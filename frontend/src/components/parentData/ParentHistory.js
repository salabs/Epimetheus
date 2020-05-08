import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { seriesTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentHistory = () => {
    const { series } = useParams();
    const [
        {
            parentData: { seriesData }
        },
        dispatch
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${series}/info?`;

        const fetchData = async () => {
            // dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                const seriesData = json.series;
                dispatch({ type: 'setSeriesData', seriesData });
                // dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [series, dispatch]);

    return <ParentTable data={seriesData} types={seriesTypes} />;
};

export default ParentHistory;
