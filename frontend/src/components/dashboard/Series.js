import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SuiteInstability from '../../components/graphs/SuiteInstability';
import TimeLineChart from '../../components/graphs/TimeLineChart';

const Series = () => {
    const { seriesId } = useParams();
    const [history, setHistory] = useState();

    useEffect(() => {
        const url = `/data/series/${seriesId}/history/`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setHistory(json);
            } catch (error) {
                console.log('Oops something went wrong ', error);
            }
        };

        fetchData();
    }, [seriesId]);

    return (
        <>
            <TimeLineChart history={history} />
            <SuiteInstability history={history} />
        </>
    );
};

export default Series;
