import React from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../../../utils/PropTypes';
import TimeLineChart from '../../graphs/TimeLineChart';
import StabilityTable from '../../stabilityTable/StabilityTable';
import LastBuildElement from '../../lastBuildTable/LastBuildTable';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '../../BreadcrumbNav';
import ContentHeader from '../../header/ContentHeader';
import ParentSeries from '../../parentData/ParentSeries';
import BuildAmountSelector from '../../testFilters/BuildAmountSelector';
import Offset from '../../testFilters/OffSetButtons';
import {
    ParentContainer,
    ChartContainer,
    ElementHeader,
} from './Series.styles';
import { TableHolder } from './Series.styles';
import {
    ParentInfo,
    ContainerGrid12,
    ContentGrid6,
} from '../../../styles/baseComponents';
import { FilterContainer } from '../../overview/FilterContainer.styles';

const SeriesOverview = ({ currentSeries }) => {
    const [t] = useTranslation(['overview']);

    return (
        <>
            <BreadcrumbNav status="series" />
            <ContentHeader />
            <div>
                <ParentInfo id="parentInfo-container">
                    <ContainerGrid12>
                        <ContentGrid6>
                            <ParentSeries currentSeries={currentSeries} />
                        </ContentGrid6>
                    </ContainerGrid12>
                </ParentInfo>
                <ContainerGrid12>
                    <ContentGrid6>
                        <FilterContainer>
                            <BuildAmountSelector />
                            <Offset />
                        </FilterContainer>
                        <ChartContainer
                            id="timeLineContainer"
                            robot_id="timeLineContainer"
                        >
                            <ElementHeader>
                                {t('series.all_builds')}
                            </ElementHeader>
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
                    </ContentGrid6>
                </ContainerGrid12>
            </div>
        </>
    );
};

SeriesOverview.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default SeriesOverview;
