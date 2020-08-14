/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PieChart from '../../components/graphs/PieChart';
import { suiteLabels, testLabels } from '../../utils/graphTypes';
import Loading from '../../components/Loading';
import { useStateValue } from '../../contexts/state';
import { useTranslation } from 'react-i18next';
import { overviewElement } from '../../styles/baseComponents';
import styled from 'styled-components';

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const ChartContainer = styled(overviewElement)`
    margin: 20px 40px 40px 0;
    background-color: var(--nero-white);
    width: ${props => props.width};
    height: ${props => props.height};
`;

const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Space Mono';
`;

const Build = () => {
    const [t] = useTranslation(['overview']);

    const { seriesId, buildId } = useParams();

    const [dispatch] = useStateValue();
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
    }, [buildId, seriesId]);

    return (
        <React.Fragment>
            {statusCount ? (
                <FlexDiv id="buildGraphDiv">
                    <ChartContainer width="450px" height="300px">
                        <ElementHeader>{t('build.suite')}</ElementHeader>
                        <PieChart
                            labels={suiteLabels}
                            statusCount={statusCount}
                        />
                    </ChartContainer>
                    <ChartContainer width="450px" height="300px">
                        <ElementHeader>{t('build.test')}</ElementHeader>
                        <PieChart
                            labels={testLabels}
                            statusCount={statusCount}
                        />
                    </ChartContainer>
                </FlexDiv>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Build;
