/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Chart from 'react-apexcharts';
import { props } from 'ramda';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
import { colorTypes } from '../../utils/colorTypes';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const TimeLineChart = () => {
    const chartStyles = css`
        padding: 20px 0px;
        h3 {
            text-align: center;
            width: 768px;
        }
    `;

    const { seriesId } = useParams();
    const [dispatch] = useStateValue();

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
    }, [seriesId]);

    const numberOfTestsWithStatus = status => {
        return (
            statusCount && statusCount.flatMap(build => props([status], build))
        );
    };

    const namedBuildNumberList =
        statusCount && statusCount.map(build => 'Build: ' + build.build_number);

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
        <div css={chartStyles}>
            {namedBuildNumberList && statusCount ? (
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
        </div>
    );
};

export default TimeLineChart;
