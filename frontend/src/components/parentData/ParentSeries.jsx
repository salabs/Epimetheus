import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../../utils/PropTypes';
import { useParams } from 'react-router';
import { buildTypes } from '../../utils/parentDataTypes';
import ParentTable from './ParentTable';
import { StateContext } from '../../contexts/state';

const ParentSeries = ({ currentSeries }) => {
    const { seriesId } = useParams();

    const { state, dispatch } = useContext(StateContext);
    const {
        parentData: { buildData },
        branchesState,
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
                    const { last_build } = branch;
                    const buildUrl = `/data/series/${seriesId}/builds/${last_build}/info?`;
                    const res = await fetch(buildUrl);
                    const json = await res.json();
                    const buildData = json.build;

                    dispatch({ type: 'setBuildData', buildData });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };

            fetchData();
        }
        return () => {
            dispatch({ type: 'flushParentData' });
        };
    }, [seriesId, branchesState, currentSeries, dispatch]);

    return <ParentTable data={buildData} types={buildTypes} />;
};

ParentSeries.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default ParentSeries;
