import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { seriesPropType } from '../../../utils/PropTypes';
import { useParams } from 'react-router';
import PieChart from '../../graphs/PieChart';
import { suiteLabels, testLabels } from '../../../utils/graphTypes';
import Loading from '../../Loading';
import { useTranslation } from 'react-i18next';
import { last } from 'ramda';
import BuildMetadata from '../../metadata/BuildMetadata';
import useMetadata from '../../../hooks/useMetadata';
import ParentBuild from '../../parentData/ParentBuild';
import BreadcrumbNav from '../../BreadcrumbNav';
import ContentHeader from '../../header/ContentHeader';
import { ParentInfo } from '../../../styles/baseComponents';
import { StateContext } from '../../../contexts/state';
import {
    PageContainer,
    FlexDiv,
    ChartContainer,
    ElementHeader,
} from './Build.styles';
import { ContainerGrid12, ContentGrid6 } from '../../../styles/baseComponents';

const BuildOverview = ({ currentSeries }) => {
    const [t] = useTranslation(['overview']);

    const { seriesId, buildId } = useParams();

    const { dispatch } = useContext(StateContext);
    const [statusCount, setStatusCount] = useState();

    useMetadata(currentSeries);

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
        <>
            <BreadcrumbNav status="build" />
            <ContentHeader />
            <div>
                <ParentInfo id="parentInfo-container">
                    <ContainerGrid12>
                        <ContentGrid6>
                            <ParentBuild currentSeries={currentSeries} />
                        </ContentGrid6>
                    </ContainerGrid12>
                </ParentInfo>
                <ContainerGrid12>
                    <ContentGrid6>
                        <PageContainer>
                            <BuildMetadata />
                            {statusCount ? (
                                <FlexDiv id="buildGraphDiv">
                                    <ChartContainer
                                        width="450px"
                                        height="300px"
                                    >
                                        <ElementHeader>
                                            {t('build.suite')}
                                        </ElementHeader>
                                        <PieChart
                                            labels={suiteLabels}
                                            statusCount={cleanseData()}
                                        />
                                    </ChartContainer>
                                    <ChartContainer
                                        width="450px"
                                        height="300px"
                                    >
                                        <ElementHeader>
                                            {t('build.test')}
                                        </ElementHeader>
                                        <PieChart
                                            labels={testLabels}
                                            statusCount={cleanseData()}
                                        />
                                    </ChartContainer>
                                </FlexDiv>
                            ) : (
                                <Loading />
                            )}
                        </PageContainer>
                    </ContentGrid6>
                </ContainerGrid12>
            </div>
        </>
    );
};

BuildOverview.propTypes = {
    currentSeries: PropTypes.arrayOf(seriesPropType),
};

export default BuildOverview;
