import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { seriesTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentHistory = () => {
    const { seriesID } = useParams();

    const [
        {
            parentData: { seriesData }
        },
        dispatch
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesID}/info?`;

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
    }, [seriesID, dispatch]);

    return <ParentTable data={seriesData} types={seriesTypes} />;
};

export default ParentHistory;
