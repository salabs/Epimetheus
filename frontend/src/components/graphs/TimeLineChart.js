﻿/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Chart from 'react-apexcharts';
import { props } from 'ramda';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
import { colorTypes } from '../../utils/colorTypes';

const TimeLineChart = () => {
    const { seriesId } = useParams();
    const [{ amountOfBuilds }, dispatch] = useStateValue();

    const [statusCount, setStatusCount] = useState();

    useEffect(() => {
        const url = `/data/series/${seriesId}/status_counts/?builds=${amountOfBuilds}`;

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
    }, [seriesId, amountOfBuilds]);

    const numberOfTestsWithStatus = status => {
        return (
            statusCount && statusCount.flatMap(build => props([status], build))
        );
    };

    const namedBuildNumberList =
        statusCount &&
        statusCount.map(build => 'Build: ' + build.build_number).reverse();

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
            fontFamily: 'Space Mono',
        },
    };

    return (
        <div>
            {namedBuildNumberList && statusCount ? (
                <React.Fragment>
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
        </div>
    );
};

export default TimeLineChart;
