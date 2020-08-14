import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { useParams } from 'react-router';
import { useStateValue } from '../contexts/state';
import Build from '../components/overview/Build';
import Series from '../components/overview/Series';
import ParentSeries from '../components/parentData/ParentSeries';
import ParentBuild from '../components/parentData/ParentBuild';
import Header from '../components/header/Header';
import styled from 'styled-components';
import Filter from '../components/historyTable/Filter';

const ParentInfo = styled.div`
    display: flex;
    flex-flow: row wrap;
    padding: 20px 0;
`;
const SeriesInfo = styled.div`
    padding-bottom: 45px;
`;

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const Overview = () => {
    const [t] = useTranslation(['parentData']);
    const { seriesId } = useParams();

    const [
        {
            parentData: { seriesData, buildData },
            branchesState,
        },
        dispatch,
    ] = useStateValue();

    const pathname = useLocation().pathname;
    const buildUrl = pathname.includes('build');

    const status = buildUrl ? 'build' : 'series';

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
    }, [dispatch, seriesId, branchesState]);

    return (
        <main>
            <BreadcrumbNav status={status} />
            <Header />
            <div>
                <ParentInfo id="parentInfo-container">
                    {!buildUrl ? (
                        <FlexColumn>
                            <Filter direction="row" />
                        </FlexColumn>
                    ) : (
                        <ParentBuild />
                    )}
                </ParentInfo>
                <FlexDiv>
                    {buildUrl ? (
                        <React.Fragment>
                            <Build />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Series />
                        </React.Fragment>
                    )}
                </FlexDiv>
            </div>
        </main>
    );
};

export default Overview;
