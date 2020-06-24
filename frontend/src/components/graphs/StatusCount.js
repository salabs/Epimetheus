import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useParams } from 'react-router';
import { pluck } from 'ramda';
import { useStateValue } from '../../contexts/state';
import { colorTypes } from '../../utils/colorTypes';

const StatusCount = ({ labels }) => {
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

    const data =
        statusCount && labels.map(label => pluck(label, statusCount)).flat();

    const series = data;
    const options = {
        labels,
        colors: [
            colorTypes['semolina red'],
            colorTypes['pirlo blue'],
            colorTypes['titan green'],
            colorTypes['kumpula yellow'],
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
            {statusCount && (
                <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="380"
                />
            )}
        </div>
    );
};

export default StatusCount;
