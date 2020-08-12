import React, { useEffect } from 'react';
import styled from 'styled-components';
import FailuresTable from './FailuresTable';
import BuildInfoTable from './BuildInfoTable';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';

const Divi = styled.div`
    border-bottom: 1px solid #ddd;
    min-width: 300px;
`;

const Containing = styled.div`
    min-width: 300px;
`;

const LastBuildElement = () => {
    const { seriesId } = useParams();

    const [
        {
            parentData: { seriesData, buildData },
        },
        dispatch,
    ] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/info?`;

        const fetchSeriesData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                const seriesData = json.series;
                dispatch({ type: 'setSeriesData', seriesData });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };

        fetchSeriesData();

        // returned function will be called on component unmount
        return () => {
            dispatch({ type: 'flushParentData' });
        };
    }, [dispatch, seriesId]);

    useEffect(() => {
        const fetchBuildData = async () => {
            const { last_build } = seriesData;
            const buildUrl = `/data/series/${seriesId}/builds/${last_build}/info?`;
            try {
                const res = await fetch(buildUrl);
                const json = await res.json();
                const buildData = json.build;
                dispatch({ type: 'setBuildData', buildData });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };

        seriesData && fetchBuildData();
    }, [dispatch, seriesData, seriesId]);

    return (
        <Containing>
            <Divi>Last Build Status</Divi>
            <BuildInfoTable />
            <Divi>Failing Test Cases</Divi>
            <FailuresTable />
        </Containing>
    );
};

export default LastBuildElement;
