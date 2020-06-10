import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';

const StatusCount = () => {
    const { seriesId, buildId } = useParams();

    const [{ statusCount }, dispatch] = useStateValue();

    useEffect(() => {
        const url = `/data/series/${seriesId}/status_counts/?start_from=${buildId}&builds=1`;

        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                const statusCount = json.status_counts;
                dispatch({ type: 'setStatusCount', statusCount });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [buildId, dispatch, seriesId]);

    // const data =

    const series = [44, 55, 41, 17, 15];
    const options = {
        // chart: {
        //     type: 'donut',
        // },
        // responsive: [
        //     {
        //         breakpoint: 480,
        //         options: {},
        //     },
        // ],
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                        },
                        total: {
                            show: true,
                        },
                    },
                },
            },
        },
        // dataLabels: {
        //     enabled: true,
        // },
    };
    return (
        <div>
            <Chart options={options} series={series} type="donut" width="380" />
        </div>
    );
};

export default StatusCount;
