import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../utils/PropTypes';
import { useParams } from 'react-router';
import { StateContext } from '../contexts/state';

const useCurrentSeries = () => {
    const { name } = useParams();
    const { dispatch } = useContext(StateContext);
    const [currentSeries, setCurrentSeries] = useState();

    useEffect(() => {
        const url = `/data/series/?team=${name}`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setCurrentSeries(json.series);
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, name]);

    return currentSeries;
};

useCurrentSeries.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default useCurrentSeries;
