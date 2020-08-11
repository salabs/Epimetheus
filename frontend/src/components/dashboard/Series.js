import React from 'react';
import SuiteInstability from '../../components/graphs/SuiteInstability';
import TimeLineChart from '../../components/graphs/TimeLineChart';
import DashboardList from '../dashlist/ListMain';
import styled from 'styled-components';
import { dashboardElement } from '../../styles/baseComponents';

const ChartContainer = styled(dashboardElement)`
    margin: 20px 40px 40px 0;
    background-color: var(--nero-white);
`;

const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Space Mono';
`;

const Series = () => {
    return (
        <>
            <ChartContainer id="timeLineContainer">
                <ElementHeader>All Build History</ElementHeader>
                <TimeLineChart />
            </ChartContainer>
            <ChartContainer className="dashboard-list">
                <ElementHeader>Stability Table</ElementHeader>
                <DashboardList />
            </ChartContainer>
            <ChartContainer>
                <ElementHeader>Suites with unstable tests</ElementHeader>
                <SuiteInstability />
            </ChartContainer>
        </>
    );
};

export default Series;
