import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { buildTypes, suiteTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentSeries = () => {
    const { seriesId, buildId, testId } = useParams();
    const [
        {
            parentData: { buildData },
        },
        dispatch,
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

        // returned function will be called on component unmount
        //return () => {
        //    dispatch({ type: 'flushParentData' });
        //};
    }, [dispatch, seriesId, buildId]);

    const types = testId ? suiteTypes : buildTypes;

    return <ParentTable data={buildData} types={types} />;
};

export default ParentSeries;
