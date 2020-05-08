import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { buildTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentHistory = () => {
    const { seriesId, buildId } = useParams();
    const [
        {
            parentData: { buildData }
        },
        dispatch
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/builds/${buildId}/info?`;

        const fetchData = async () => {
            // dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                const buildData = json.build;
                dispatch({ type: 'setBuildData', buildData });
                // dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, buildId]);

    return <ParentTable data={buildData} types={buildTypes} />;
};

export default ParentHistory;
