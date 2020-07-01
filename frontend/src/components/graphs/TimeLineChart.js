import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import BreadcrumbNav from '../../components/BreadcrumbNav';
import { useStateValue } from '../../contexts/state';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const TimeLineChart = () => {
    const { seriesId } = useParams();

    const [{ historyDataState }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/history/`;
        const fetchData = async () => {
            // dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                dispatch({
                    type: 'updateHistory',
                    historyData: json,
                });
                // dispatch({ type: 'setLoadingState', loadingState: false });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };

        fetchData();
    }, [dispatch, seriesId]);

    console.log('HistoryDataState', historyDataState);

    const kek =
        historyDataState &&
        historyDataState.history.map(data => data.test_cases);
    console.log('kek', kek);

    return <div>TimeLineChart</div>;
};

export default TimeLineChart;
