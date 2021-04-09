/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import { buildTypes } from '../../utils/parentDataTypes';

import ParentTable from './ParentTable';

const ParentBuild = () => {
    const { seriesId, buildId } = useParams();
    const [
        {
            parentData: { buildData },
            branchesState,
        },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        if (branchesState) {
            const branch = branchesState.series?.find(
                ({ id: serie_id }) => serie_id === parseInt(seriesId, 10)
            );
            const fetchData = async () => {
                dispatch({ type: 'setSeriesData', seriesData: branch });
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch.name || ' ',
                    id: seriesId,
                    team: branch.team || ' ',
                });
                try {
                    const url = `/data/series/${seriesId}/builds/${buildId}/info?`;
                    const res = await fetch(url);
                    const json = await res.json();
                    const buildData = json.build;

                    dispatch({ type: 'setBuildData', buildData });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };

            fetchData();
        }
        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'flushParentData' });
        };
    }, [seriesId, buildId, branchesState]);

    return <ParentTable data={buildData} types={buildTypes} />;
};

export default ParentBuild;
