import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import StatusCount from '../../components/graphs/StatusCount';
import { suiteLabels, testLabels } from '../../utils/graphTypes';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const Build = () => {
    const buildStyles = css`
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
    `;

    const { seriesId, buildId } = useParams();

    const [{}, dispatch] = useStateValue();

    const [statusCount, setStatusCount] = useState();

    useEffect(() => {
        const url = `/data/series/${seriesId}/status_counts/?start_from=${buildId}&builds=1`;

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
    }, [buildId, dispatch, seriesId]);

    return (
        <React.Fragment>
            {statusCount ? (
                <div css={buildStyles}>
                    <StatusCount
                        labels={suiteLabels}
                        statusCount={statusCount}
                    />{' '}
                    <StatusCount
                        labels={testLabels}
                        statusCount={statusCount}
                    />
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Build;
