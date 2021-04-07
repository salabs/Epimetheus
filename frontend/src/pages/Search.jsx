import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import DropdownSelect from '../components/buttons/DropdownSelect';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import { DropdownContainer, SearchAction } from './Search.styles';

const Search = () => {
    const [seriesList, setSeriesList] = useState([]);
    const [buildList, setBuildList] = useState([]);
    const [series, setSeries] = useState();
    const [build, setBuild] = useState();
    const [loadingState, setLoadingState] = useState(false);
    const [loadingStateBuild, setLoadingStateBuild] = useState(false);
    const [seriesLoading, setSeriesLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const fetchSeriesData = async () => {
            setLoadingState(true);
            try {
                const res = await fetch('/data/series/?', {});
                const json = await res.json();
                if (!isCancelled) {
                    setSeriesLoading(false);
                    setSeriesList(json.series);
                    setLoadingState(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        const fetchBuildData = async () => {
            setLoadingStateBuild(true);
            try {
                const res = await fetch(`/data/series/${series}/builds/?`, {});
                const json = await res.json();
                if (!isCancelled) {
                    setBuildList(json.builds);
                    setLoadingStateBuild(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        if (!series) {
            fetchSeriesData();
        }
        if (!seriesLoading) {
            if (series) {
                setBuild(undefined);
                setBuildList([]);
                fetchBuildData();
            }
        }
        return () => {
            isCancelled = true;
        };
    }, [series, seriesLoading]);

    return (
        <ContainerGrid12>
            <ContentGrid6>
                {loadingState ? (
                    <Loading />
                ) : (
                    <>
                        <h1>Search for a build</h1>
                        <DropdownContainer>
                            <DropdownSelect
                                label="Series"
                                selectorValues={seriesList.map(series => {
                                    return {
                                        value: series.id,
                                        label: series.name,
                                        id: series.id,
                                    };
                                })}
                                onChange={e => setSeries(e)}
                                initialValue={series ? series : ''}
                                id="select-series-search"
                            />
                        </DropdownContainer>
                        {!loadingStateBuild && (
                            <DropdownContainer>
                                <DropdownSelect
                                    label="Build"
                                    selectorValues={buildList.map(build => {
                                        return {
                                            value: build.build_number,
                                            label: build.build_number,
                                            id: build.build_number,
                                        };
                                    })}
                                    onChange={e => setBuild(e)}
                                    initialValue={build ? build : ''}
                                    id="select-build-search"
                                />
                            </DropdownContainer>
                        )}
                        {build && (
                            <SearchAction
                                to={`/series/${series}/build/${build}/history`}
                            >
                                Search
                            </SearchAction>
                        )}
                    </>
                )}
            </ContentGrid6>
        </ContainerGrid12>
    );
};

export default Search;
