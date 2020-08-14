import React from 'react';
import SuiteInstability from '../graphs/SuiteInstability';
import TimeLineChart from '../graphs/TimeLineChart';
import DashboardList from '../dashlist/ListMain';
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

    return (
        <>
            <ChartContainer id="timeLineContainer" width="55%" minWidth="790px">
                <ElementHeader>{t('series.all_builds')}</ElementHeader>
                <TimeLineChart />
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
