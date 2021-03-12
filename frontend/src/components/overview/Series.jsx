/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useStateValue } from '../../contexts/state';
import TimeLineChart from '../graphs/TimeLineChart';
import DashboardList from '../dashlist/ListMain';
import LastBuildElement from '../lastBuildElement/LastBuild';
import { useTranslation } from 'react-i18next';
import {
    ParentContainer,
    ChartContainer,
    ElementHeader,
} from './Series.styles';

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
        <ParentContainer>
            <ChartContainer id="timeLineContainer" width="790px">
                <ElementHeader>{t('series.all_builds')}</ElementHeader>
                <TimeLineChart />
            </ChartContainer>
            <ChartContainer minWidth="400px">
                <LastBuildElement />
            </ChartContainer>
            <ChartContainer className="overview-list" width="500px">
                <ElementHeader>{t('series.stability_table')}</ElementHeader>
                <DashboardList />
            </ChartContainer>
        </ParentContainer>
    );
};

export default Series;
