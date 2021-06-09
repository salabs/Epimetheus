import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../../utils/PropTypes';
import { useParams } from 'react-router';
import { buildTypes } from '../../utils/parentDataTypes';
import { StateContext } from '../../contexts/state';

import ParentTable from './ParentTable';

const ParentBuild = ({ currentSeries }) => {
    const { seriesId, buildId } = useParams();

    const { state, dispatch } = useContext(StateContext);
    const {
        parentData: { buildData },
    } = state;

    useEffect(() => {
        if (currentSeries) {
            const branch = currentSeries?.find(
                ({ id: serie_id }) => serie_id === parseInt(seriesId, 10)
            );
            const fetchData = async () => {
                dispatch({ type: 'setSeriesData', seriesData: branch });
                dispatch({
                    type: 'setSelectedSeries',
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
    }, [seriesId, buildId, currentSeries, dispatch]);

    return <ParentTable data={buildData} types={buildTypes} />;
};

ParentBuild.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default ParentBuild;
