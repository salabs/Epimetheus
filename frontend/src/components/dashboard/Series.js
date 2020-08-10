import React from 'react';
import SuiteInstability from '../../components/graphs/SuiteInstability';
import TimeLineChart from '../../components/graphs/TimeLineChart';
import DashboardList from '../dashlist/ListMain';
import styled from 'styled-components';
import { dashboardElement } from '../../styles/baseComponents';

const TimeLineContainer = styled(dashboardElement)`
    margin: 10px;
`;

const ListContainer = styled(dashboardElement)`
    margin: 10px;
`;

const SuiteInstabilityContainer = styled(dashboardElement)`
    margin: 10px;
`;

const ElementHeader = styled.h3`
    text-align: center;
    margin: 10px;
    font-family: 'Space Mono';
`;

const Series = () => {
    return (
        <>
            <TimeLineContainer>
                <ElementHeader>All Build History</ElementHeader>
                <TimeLineChart />
            </TimeLineContainer>
            <ListContainer className="dashboard-list">
                <ElementHeader>Stability Table</ElementHeader>
                <DashboardList />
            </ListContainer>
            <SuiteInstabilityContainer>
                <ElementHeader>Suites with unstable tests</ElementHeader>
                <SuiteInstability />
            </SuiteInstabilityContainer>
        </>
    );
};

export default Series;
