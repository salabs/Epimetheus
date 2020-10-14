import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PieChart from '../graphs/PieChart';
import { suiteLabels, testLabels } from '../../utils/graphTypes';
import Loading from '../Loading';
import { useStateValue } from '../../contexts/state';
import { useTranslation } from 'react-i18next';
import { last } from 'ramda';
import BuildMetadata from '../metadata/BuildMetadata';
import useMetadata from '../../hooks/useMetadata';
import { FlexDiv, ChartContainer, ElementHeader } from './Build.styles';

const Build = () => {
    const [t] = useTranslation(['overview']);

    const { seriesId, buildId } = useParams();

    const [dispatch] = useStateValue();
    const [statusCount, setStatusCount] = useState();

    useMetadata();

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

    const cleanseData = () => {
        return statusCount && statusCount.length > 1
            ? [last(statusCount)]
            : statusCount;
    };

    return (
        <React.Fragment>
            <BuildMetadata />
            {statusCount ? (
                <FlexDiv id="buildGraphDiv">
                    <ChartContainer width="450px" height="300px">
                        <ElementHeader>{t('build.suite')}</ElementHeader>
                        <PieChart
                            labels={suiteLabels}
                            statusCount={cleanseData()}
                        />
                    </ChartContainer>
                    <ChartContainer width="450px" height="300px">
                        <ElementHeader>{t('build.test')}</ElementHeader>
                        <PieChart
                            labels={testLabels}
                            statusCount={cleanseData()}
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
