import React from 'react';
import TimeLineChart from '../graphs/TimeLineChart';
import StabilityTable from '../stabilityTable/StabilityTable';
import LastBuildElement from '../lastBuildTable/LastBuildTable';
import { useTranslation } from 'react-i18next';
import {
    ParentContainer,
    ChartContainer,
    ElementHeader,
} from './Series.styles';
import { TableHolder } from './Series.styles';

const Series = () => {
    const [t] = useTranslation(['overview']);

    return (
        <>
            <ChartContainer robot_id="timeLineContainer" id="timeLineContainer">
                <ElementHeader>{t('series.all_builds')}</ElementHeader>
                <TimeLineChart />
            </ChartContainer>
            <ParentContainer>
                <TableHolder>
                    <ElementHeader>
                        {t('series.last_build.title')}
                    </ElementHeader>
                    <LastBuildElement />
                </TableHolder>
                <TableHolder>
                    <ElementHeader>
                        {t('series.stability_table.title')}
                    </ElementHeader>
                    <StabilityTable />
                </TableHolder>
            </ParentContainer>
        </>
    );
};

export default Series;
