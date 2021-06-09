import React from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../utils/PropTypes';
import { useLocation } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import BuildOverview from '../components/overview/BuildOverview';
import SeriesOverview from '../components/overview/SeriesOverview';
import ParentBuild from '../components/parentData/ParentBuild';
import { ParentInfo } from './Overview.styles';
import BuildAmountSelector from '../components/testFilters/BuildAmountSelector';
import Offset from '../components/testFilters/OffSetButtons';
import ContentHeader from '../components/header/ContentHeader';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import ParentSeries from '../components/parentData/ParentSeries';
import { FilterContainer } from '../components/overview/FilterContainer.styles';

const Overview = ({ currentSeries }) => {
    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

    return (
        <div>
            <BreadcrumbNav status={status} />
            <ContentHeader />
            <div>
                <ParentInfo id="parentInfo-container">
                    <ContainerGrid12>
                        <ContentGrid6>
                            {!buildUrl ? (
                                <ParentSeries currentSeries={currentSeries} />
                            ) : (
                                <ParentBuild />
                            )}
                        </ContentGrid6>
                    </ContainerGrid12>
                </ParentInfo>
                <ContainerGrid12>
                    {buildUrl ? (
                        <ContentGrid6>
                            <BuildOverview />
                        </ContentGrid6>
                    ) : (
                        <ContentGrid6>
                            <FilterContainer>
                                <BuildAmountSelector />
                                <Offset />
                            </FilterContainer>
                            <SeriesOverview />
                        </ContentGrid6>
                    )}
                </ContainerGrid12>
            </div>
        </div>
    );
};

Overview.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default Overview;
