import React from 'react';
import Chart from 'react-apexcharts';
import { pluck } from 'ramda';
import Loading from '../../components/Loading';
import { colorTypes } from '../../utils/colorTypes';

const StatusCount = ({ labels, statusCount }) => {
    const series =
        statusCount && labels.flatMap(label => pluck(label, statusCount));

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
