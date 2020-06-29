// eslint-disable-next-line
import React,{ useState, useEffect, Fragment } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';

const ComparisonForm = () => {
    let history = useHistory();
    const [seriesList, setSeriesList] = useState([]);
    const [seriesList2, setSeriesList2] = useState([]);
    const [buildList, setBuildList] = useState([]);
    const [buildList2, setBuildList2] = useState([]);
    const [series, setSeries] = useState();
    const [build, setBuild] = useState();

    const [series2, setSeries2] = useState();
    const [build2, setBuild2] = useState();
    const [loadingState, setLoadingState] = useState(false);
    const [seriesLoading, setSeriesLoading] = useState(true);

    const [team, setTeam] = useState();
    const [team2, setTeam2] = useState();
    const [teamList, setTeamList] = useState([]);

    const buildStyles = css`
        position: relative;
        margin-top: 10px;
        .input-container {
            display: inline-block;
            padding: 20px;
        }
        .input-container div {
            padding: 10px;
        }
    `;
    useEffect(() => {
        let isCancelled = false;

        const fetchSeriesList1 = async () => {
            setLoadingState(true);
            try {
                if (!isCancelled) {
                    setLoadingState(false);
                    setSeriesLoading(false);
                    setSeriesList(
                        teamList.filter(x => x.name === team)[0].series
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSeriesList2 = async () => {
            setLoadingState(true);
            try {
                if (!isCancelled) {
                    setLoadingState(false);
                    setSeriesLoading(false);
                    setSeriesList2(
                        teamList.filter(x => x.name === team2)[0].series
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTeamData = async () => {
            setLoadingState(true);
            try {
                const res = await fetch('/data/teams', {});
                const json = await res.json();
                if (!isCancelled) {
                    setLoadingState(false);
                    setTeamList(json.teams);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchBuildData = async () => {
            setLoadingState(true);
            try {
                const res = await fetch(`/data/series/${series}/builds/`, {});
                const json = await res.json();
                if (!isCancelled) {
                    setLoadingState(false);
                    setBuildList(json.builds);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchBuildData2 = async () => {
            setLoadingState(true);
            try {
                const res = await fetch(`/data/series/${series2}/builds/`, {});
                const json = await res.json();
                if (!isCancelled) {
                    setLoadingState(false);
                    setBuildList2(json.builds);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (!teamList.length) {
            fetchTeamData();
        }

        if (team) {
            fetchSeriesList1();
        }
        if (team2) {
            fetchSeriesList2();
        }
        if (!seriesLoading) {
            if (series) {
                fetchBuildData();
            }
            if (series2) {
                fetchBuildData2();
            }
        }
        return () => {
            isCancelled = true;
        };
    }, [team, team2, series, series2, build, build2]);

    return (
        <div className="form-container" css={buildStyles}>
            {loadingState ? (
                <div>Please Wait</div>
            ) : (
                <form
                    onSubmit={() =>
                        history.push(
                            `/compare/${series}/${build}/to/${series2}/${build2}`
                        )
                    }
                >
                    <div className="input-container" id="first-input-container">
                        <div id="first-team-container">
                            <h4>Team1</h4>
                            <select
                                defaultValue={'Default'}
                                value={team}
                                onChange={e => setTeam(e.target.value)}
                            >
                                <option
                                    value="Default"
                                    disabled
                                    style={{ display: 'none' }}
                                >
                                    Please select Team
                                </option>
                                {teamList.map(team => {
                                    return (
                                        <option
                                            value={team.name}
                                            key={team.name}
                                        >
                                            {team.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div id="first-series-container">
                            <h4>Series1</h4>
                            <select
                                defaultValue={'Default'}
                                value={series}
                                onChange={e => setSeries(e.target.value)}
                            >
                                <option
                                    value="Default"
                                    disabled
                                    style={{ display: 'none' }}
                                >
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
                                <option
                                    value="Default"
                                    disabled
                                    style={{ display: 'none' }}
                                >
                                    Please select Build
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
                    <div
                        className="input-container"
                        id="second-input-container"
                    >
                        <div id="second-team-container">
                            <h4>Team2</h4>
                            <select
                                defaultValue={'Default'}
                                value={team2}
                                onChange={e => setTeam2(e.target.value)}
                            >
                                <option
                                    value="Default"
                                    disabled
                                    style={{ display: 'none' }}
                                >
                                    Please select Team
                                </option>
                                {teamList.map(team => {
                                    return (
                                        <option
                                            value={team.name}
                                            key={team.name}
                                        >
                                            {team.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div id="second-series-container">
                            <h4>Series2</h4>
                            <select
                                defaultValue={'Default'}
                                value={series2}
                                onChange={e => setSeries2(e.target.value)}
                            >
                                <option
                                    value="Default"
                                    disabled
                                    style={{ display: 'none' }}
                                >
                                    Please select Series
                                </option>
                                {seriesList2.map(series => {
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
                        <div id="second-build-container">
                            <h4>Build2</h4>
                            <select
                                defaultValue={'Default'}
                                value={build2}
                                onChange={e => setBuild2(e.target.value)}
                            >
                                <option
                                    value="Default"
                                    disabled
                                    style={{ display: 'none' }}
                                >
                                    Please select Build
                                </option>
                                {buildList2.map(build => {
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
            )}
        </div>
    );
};

export default ComparisonForm;
