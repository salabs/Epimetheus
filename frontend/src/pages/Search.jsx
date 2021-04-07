import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';

const Search = () => {
    let history = useHistory();

    const [seriesList, setSeriesList] = useState([]);
    const [buildList, setBuildList] = useState([]);
    const [series, setSeries] = useState();
    const [build, setBuild] = useState();
    const [loadingState, setLoadingState] = useState(false);
    const [seriesLoading, setSeriesLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
            setLoadingState(true);
            try {
                const res = await fetch('/data/series?', {});
                const json = await res.json();
                if (!isCancelled) {
                    setLoadingState(false);
                    setSeriesLoading(false);
                    setSeriesList(json.series);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchBuildData = async () => {
            setLoadingState(true);
            try {
                const res = await fetch(`/data/series/${series}/builds/?`, {});
                const json = await res.json();
                if (!isCancelled) {
                    setLoadingState(false);
                    setBuildList(json.builds);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (!series) {
            fetchData();
        }
        if (!seriesLoading) {
            if (series) {
                fetchBuildData();
            }
        }
        return () => {
            isCancelled = true;
        };
    }, [series, build]);

    return (
        <ContainerGrid12>
            <ContentGrid6>
                {loadingState ? (
                    <Loading />
                ) : (
                    <>
                        <h1>Search</h1>
                        <form
                            onSubmit={() =>
                                history.push(
                                    `/series/${series}/build/${build}/history`
                                )
                            }
                        >
                            <div
                                className="input-container"
                                id="first-input-container"
                            >
                                <div id="first-series-container">
                                    <h4>Series1</h4>
                                    <select
                                        value={series}
                                        onChange={e =>
                                            setSeries(e.target.value)
                                        }
                                    >
                                        <option value="Default" disabled>
                                            Please select Series
                                        </option>
                                        {seriesList.map(series => {
                                            return (
                                                <option
                                                    key={series.id}
                                                    value={series.id}
                                                >
                                                    {series.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div id="first-build-container">
                                    <h4>Build1</h4>
                                    <select
                                        defaultValue={'Default'}
                                        value={build}
                                        onChange={e => setBuild(e.target.value)}
                                    >
                                        <option value="Default" disabled>
                                            Please select Build after Series
                                        </option>
                                        {buildList.map(build => {
                                            return (
                                                <option
                                                    key={build.build_number}
                                                    value={build.build_number}
                                                >
                                                    {build.build_number}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <input type="submit" value="Compare" />
                        </form>
                    </>
                )}
            </ContentGrid6>
        </ContainerGrid12>
    );
};

export default Search;
