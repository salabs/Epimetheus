import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import Chart from 'react-apexcharts';
import { props } from 'ramda';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import { colorTypes } from '../../utils/colorTypes';
import { StateContext } from '../../contexts/state';

const TimeLineChart = () => {
    const { name, seriesId } = useParams();
    const history = useHistory();

    const { state, dispatch } = useContext(StateContext);
    const { amountOfBuilds, offset } = state;

    const [statusCount, setStatusCount] = useState();

    useEffect(() => {
        let mounted = true;
        const url = `/data/series/${seriesId}/status_counts/?builds=${amountOfBuilds}&offset=${offset}`;

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (mounted) {
                    setStatusCount(json.status_counts);
                }
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
        return () => (mounted = false);
    }, [seriesId, amountOfBuilds, offset, dispatch]);

    const numberOfTestsWithStatus = status => {
        return (
            statusCount && statusCount.flatMap(build => props([status], build))
        );
    };

    const namedBuildNumberList =
        statusCount && statusCount.map(build => build.build_number);

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
            title: {
                text: 'Build',
            },
            labels: {
                rotate: -45,
                rotateAlways: false,
                hideOverlappingLabels: true,
            },
        },
        yaxis: {
            title: {
                text: 'Number of tests',
            },
        },
        stroke: {
            curve: 'smooth',
        },
        legend: {
            position: 'top',
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
            fontFamily: 'Hack',
            events: {
                markerClick(event, chartContext, { dataPointIndex }) {
                    const statusCountIndex =
                        statusCount[parseInt(dataPointIndex)];
                    dispatch({ type: 'flushParams' });
                    history.push(
                        `/team/${name}/series/${seriesId}/build/${statusCountIndex.build_number}/overview`
                    );
                },
            },
        },
    };

    return (
        <div>
            {namedBuildNumberList && statusCount ? (
                <React.Fragment>
                    <Chart options={options} series={series} type="area" />
                </React.Fragment>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default TimeLineChart;
