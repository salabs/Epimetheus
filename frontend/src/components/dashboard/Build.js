import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import StatusCount from '../../components/graphs/StatusCount';
import { suiteLabels, testLabels } from '../../utils/graphTypes';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';

const FlexDiv = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
`;

const Build = () => {
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
                <FlexDiv>
                    <StatusCount
                        labels={suiteLabels}
                        statusCount={statusCount}
                    />{' '}
                    <StatusCount
                        labels={testLabels}
                        statusCount={statusCount}
                    />
                </FlexDiv>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Build;
