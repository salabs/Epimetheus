import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';
import { pluck } from 'ramda';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
import { colorTypes } from '../../utils/colorTypes';

const StatusCount = ({ labels }) => {
    const { seriesId, buildId } = useParams();

    const [{}, dispatch] = useStateValue();

    const [statusCount, setStatusCount] = useState();

    useEffect(() => {
        const url = `/data/series/${seriesId}/status_counts/?start_from=${buildId}&builds=1`;

        const fetchData = async () => {
            // dispatch({ type: 'setLoadingState', loadingState: true });
            try {
                const res = await fetch(url);
                const json = await res.json();
                // dispatch({ type: 'setLoadingState', loadingState: false });
                // const statusCount = json.status_counts;
                setStatusCount(json.status_counts);
                // dispatch({ type: 'setStatusCount', statusCount });
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
    }, [buildId, dispatch, seriesId]);

    const data =
        statusCount && labels.flatMap(label => pluck(label, statusCount));

    const series = data;
    const options = {
        labels,
        colors: [
            colorTypes['semolina red'],
            colorTypes['titan green'],
            colorTypes['pirlo blue'],
        ],
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
    };
    return (
        <div>
            {statusCount ? (
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="380"
                />
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default StatusCount;
