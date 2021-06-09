import { useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { seriesPropType } from '../utils/PropTypes';
import { StateContext } from '../contexts/state';

const useMetadata = ({ currentSeries }) => {
    const { state, dispatch } = useContext(StateContext);
    const { selectedSeriesState } = state;

    let { buildId, seriesId } = useParams();

    const branch_id = seriesId || selectedSeriesState;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            if (branch_id && buildId) {
                try {
                    const res = await fetch(
                        `/data/series/${branch_id}/builds/${buildId}/metadata`,
                        {}
                    );
                    const json = await res.json();
                    dispatch({ type: 'setLoadingState', loadingState: false });
                    dispatch({
                        type: 'setMetadata',
                        metadata: json,
                    });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            }
        };
        if (currentSeries) {
            fetchData();
        }

        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'flushMetadata' });
        };
    }, [branch_id, currentSeries, buildId, dispatch]);
};

useMetadata.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default useMetadata;
