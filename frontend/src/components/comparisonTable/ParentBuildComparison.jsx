import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { suiteTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentSeries = () => {
    const { seriesId, buildId, seriesId2, buildId2 } = useParams();

    const [
        {
            parentData: { buildData },
        },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/builds/${buildId}/info/?`;
        const url2 = `/data/series/${seriesId2}/builds/${buildId2}/info/?`;
        const fetchData = async () => {
            // dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                const buildData1 = json.build;
                const res2 = await fetch(url2);
                const json2 = await res2.json();
                const buildData2 = json2.build;

                buildData1.team2 = buildData2.team;
                buildData1.name2 = buildData2.name;
                buildData1.build_number2 = buildData2.build_number;
                buildData1.build_id2 = buildData2.build_id;
                buildData1.start_time2 = buildData2.start_time;

                const buildData = buildData1;
                dispatch({ type: 'setBuildData', buildData });
                // dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId, seriesId2, buildId, buildId2]);

    return <ParentTable data={buildData} types={suiteTypes} />;
};

export default ParentSeries;
