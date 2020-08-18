/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import SuiteInstability from '../graphs/SuiteInstability';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import TimeLineChart from '../graphs/TimeLineChart';
import DashboardList from '../dashlist/ListMain';
import LastBuildElement from '../lastBuildElement/LastBuild';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { overviewElement } from '../../styles/baseComponents';

const ChartContainer = styled(overviewElement)`
    margin: 20px 40px 40px 0;
    background-color: var(--nero-white);
    width: ${props => props.width};
    min-width: ${props => props.minWidth};
`;

const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Space Mono';
`;

const Series = () => {
    const [t] = useTranslation(['overview']);

    const { seriesId } = useParams();

    const [{ branchesState }, dispatch] = useStateValue();

    useEffect(() => {
        if (branchesState) {
            const branch = branchesState.series?.find(
                ({ id: serie_id }) => serie_id === parseInt(seriesId, 10)
            );
            const fetchData = async () => {
                dispatch({ type: 'setSeriesData', seriesData: branch });
                dispatch({
                    type: 'setSelectedBranch',
                    name: branch.name || ' ',
                    id: seriesId,
                    team: branch.team || ' ',
                });
                try {
                    const { last_build } = branch;
                    const buildUrl = `/data/series/${seriesId}/builds/${last_build}/info?`;
                    const res = await fetch(buildUrl);
                    const json = await res.json();
                    const buildData = json.build;

                    dispatch({ type: 'setBuildData', buildData });
                } catch (error) {
                    dispatch({ type: 'setErrorState', errorState: error });
                }
            };

            fetchData();
        }
        return () => {
            dispatch({ type: 'flushParentData' });
        };
    }, [seriesId, branchesState]);

    return (
        <>
            <ChartContainer id="timeLineContainer" width="55%" minWidth="790px">
                <ElementHeader>{t('series.all_builds')}</ElementHeader>
                <TimeLineChart />
            </ChartContainer>
            <ChartContainer minWidth="400px">
                <LastBuildElement />
            </ChartContainer>
            <ChartContainer
                className="overview-list"
                width="30%"
                minWidth="500px"
            >
                <ElementHeader>{t('series.stability_table')}</ElementHeader>
                <DashboardList />
            </ChartContainer>
            <ChartContainer table width="40%" minWidth="610px">
                <ElementHeader>{t('series.unstable_tests')}</ElementHeader>
                <SuiteInstability />
            </ChartContainer>
        </>
    );
};

export default Series;
