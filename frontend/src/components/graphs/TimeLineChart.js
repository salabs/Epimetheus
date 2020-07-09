import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Chart from 'react-apexcharts';
import { props } from 'ramda';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
import { colorTypes } from '../../utils/colorTypes';
import styled from 'styled-components';

const ChartDiv = styled.div`
    padding: 20px 0px;
    h3 {
        text-align: center;
        width: 768px;
    }
`;

const TimeLineChart = () => {
    const { seriesId } = useParams();

    const [
        {
            parentData: { buildData },
        },
        dispatch,
    ] = useStateValue();

    const [statusCount, setStatusCount] = useState();

    useEffect(() => {
        const url = `/data/series/${seriesId}/status_counts/?builds=0`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setStatusCount(json.status_counts);
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [dispatch, seriesId]);

    const buildNumberList =
        buildData &&
        Array.from(Array(buildData.build_number), (_, i) => i + 1).reverse();

    const numberOfTestsWithStatus = status => {
        return (
            buildNumberList &&
            statusCount &&
            buildNumberList.map(buildNumber => {
                return statusCount
                    .filter(t => t.build_number === buildNumber)
                    .flatMap(t => props([status], t))
                    .pop();
            })
        );
    };

    const namedBuildNumberList =
        buildNumberList &&
        buildNumberList.map(buildNumber => 'Build: ' + buildNumber);

    const series = [
        {
            data: numberOfTestsWithStatus('tests_passed'),
            name: 'passed',
        },
        {
            data: numberOfTestsWithStatus('tests_failed'),
            name: 'failed',
        },
        {
            data: numberOfTestsWithStatus('tests_skipped'),
            name: 'skipped',
        },
    ];

    const options = {
        xaxis: {
            categories: namedBuildNumberList,
            labels: {
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
            },
        },
        stroke: {
            curve: 'smooth',
        },
        colors: [
            colorTypes['titan green'],
            colorTypes['semolina red'],
            colorTypes['pirlo blue'],
        ],
        dataLabels: {
            enabled: false,
        },
        chart: {
            type: 'area',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
    };

    return (
        <ChartDiv>
            {buildNumberList && statusCount ? (
                <React.Fragment>
                    <h3>All build history</h3>
                    <Chart
                        options={options}
                        series={series}
                        width="768"
                        type="area"
                    />
                </React.Fragment>
            ) : (
                <Loading />
            )}
        </ChartDiv>
    );
};

export default TimeLineChart;
