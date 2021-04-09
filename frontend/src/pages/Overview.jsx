/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import Build from '../components/overview/Build';
import Series from '../components/overview/Series';
import ParentBuild from '../components/parentData/ParentBuild';
import { ParentInfo } from './Overview.styles';
import BuildAmountSelector from '../components/testFilters/BuildAmountSelector';
import Offset from '../components/testFilters/OffSetButtons';
import ContentHeader from '../components/header/ContentHeader';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import ParentSeries from '../components/parentData/ParentSeries';
import { FilterContainer } from '../components/overview/FilterContainer.styles';

const Overview = () => {
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
                            {!buildUrl ? <ParentSeries /> : <ParentBuild />}
                        </ContentGrid6>
                    </ContainerGrid12>
                </ParentInfo>
                <ContainerGrid12>
                    {buildUrl ? (
                        <ContentGrid6>
                            <Build />
                        </ContentGrid6>
                    ) : (
                        <ContentGrid6>
                            <FilterContainer>
                                <BuildAmountSelector />
                                <Offset />
                            </FilterContainer>
                            <Series />
                        </ContentGrid6>
                    )}
                </ContainerGrid12>
            </div>
        </div>
    );
};

export default Overview;
