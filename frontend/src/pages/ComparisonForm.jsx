import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { ContainerGrid12, ContentGrid6 } from '../styles/baseComponents';
import DropdownSelect from '../components/buttons/DropdownSelect';
import {
    ComparisonFormContainer,
    ComparisonAction,
} from './ComparisonForm.styles';

const ComparisonForm = () => {
    const [teamList, setTeamList] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    const [team1, setTeam1] = useState();
    const [series1, setSeries1] = useState();
    const [seriesList1, setSeriesList1] = useState([]);
    const [build1, setBuild1] = useState();
    const [buildList1, setBuildList1] = useState([]);
    const [series1Loading, setSeries1Loading] = useState(false);
    const [build1Loading, setBuild1Loading] = useState(false);

    const [team2, setTeam2] = useState();
    const [series2, setSeries2] = useState();
    const [seriesList2, setSeriesList2] = useState([]);
    const [build2, setBuild2] = useState();
    const [buildList2, setBuildList2] = useState([]);
    const [series2Loading, setSeries2Loading] = useState(false);
    const [build2Loading, setBuild2Loading] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const fetchTeamData = async () => {
            setLoadingState(true);
            try {
                const res = await fetch('/data/teams/?', {});
                const json = await res.json();
                if (!isCancelled) {
                    setTeamList(json.teams);
                    setLoadingState(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        if (!teamList.length) {
            fetchTeamData(isCancelled);
        }

        return () => {
            isCancelled = true;
        };
    }, [teamList]);

    useEffect(() => {
        let isCancelled = false;
        const filterSeriesList1 = async () => {
            setSeries1Loading(true);
            try {
                if (!isCancelled) {
                    await setSeriesList1(
                        teamList.filter(x => x.name === team1)[0].series
                    );
                    setSeries1Loading(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        const fetchBuildData = async () => {
            setBuild1Loading(true);
            setBuild1('');
            try {
                const res = await fetch(`/data/series/${series1}/builds/`, {});
                const json = await res.json();
                if (!isCancelled) {
                    setBuildList1(json.builds);
                    setBuild1Loading(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        if (team1) {
            filterSeriesList1();
        }

        if (series1) {
            fetchBuildData();
        }

        return () => {
            isCancelled = true;
        };
    }, [team1, series1, teamList]);

    useEffect(() => {
        let isCancelled = false;

        const filterSeriesList2 = async () => {
            setSeries2Loading(true);
            try {
                if (!isCancelled) {
                    await setSeriesList2(
                        teamList.filter(x => x.name === team2)[0].series
                    );
                    setSeries2Loading(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        const fetchBuildData2 = async () => {
            setBuild2Loading(true);
            setBuild2('');
            try {
                const res = await fetch(`/data/series/${series2}/builds/`, {});
                const json = await res.json();
                if (!isCancelled) {
                    setBuildList2(json.builds);
                    setBuild2Loading(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };

        if (team2) {
            filterSeriesList2();
        }

        if (series2) {
            fetchBuildData2();
        }

        return () => {
            isCancelled = true;
        };
    }, [team2, series2, teamList]);

    return (
        <div className="form-container">
            {loadingState ? (
                <ContainerGrid12>
                    <ContentGrid6>
                        <Loading />
                    </ContentGrid6>
                </ContainerGrid12>
            ) : (
                <ContainerGrid12>
                    <ContentGrid6>
                        <h1>Compare</h1>
                        <ComparisonFormContainer>
                            <div id="first-input-container">
                                <DropdownSelect
                                    label="Team1"
                                    selectorValues={teamList.map(team => {
                                        return {
                                            value: team.name,
                                            label: team.name,
                                            id: team.name,
                                        };
                                    })}
                                    onChange={e => setTeam1(e)}
                                    initialValue={team1 ? team1 : ''}
                                    id="select-team1-search"
                                />
                                {!series1Loading && (
                                    <DropdownSelect
                                        label="Series1"
                                        selectorValues={seriesList1.map(
                                            series => {
                                                return {
                                                    value: series.id,
                                                    label: series.name,
                                                    id: series.id,
                                                };
                                            }
                                        )}
                                        onChange={e => setSeries1(e)}
                                        initialValue={series1 ? series1 : ''}
                                        id="select-series1-search"
                                    />
                                )}
                                {!build1Loading && (
                                    <DropdownSelect
                                        label="Build1"
                                        selectorValues={buildList1.map(
                                            build => {
                                                return {
                                                    value: build.build_number,
                                                    label: build.build_number,
                                                    id: build.build_number,
                                                };
                                            }
                                        )}
                                        onChange={e => setBuild1(e)}
                                        initialValue={build1 ? build1 : ''}
                                        id="select-build1-search"
                                    />
                                )}
                            </div>
                            <div id="second-input-container">
                                <DropdownSelect
                                    label="Team2"
                                    selectorValues={teamList.map(team => {
                                        return {
                                            value: team.name,
                                            label: team.name,
                                            id: team.name,
                                        };
                                    })}
                                    onChange={e => setTeam2(e)}
                                    initialValue={team2 ? team2 : ''}
                                    id="select-team2-search"
                                />
                                {!series2Loading && (
                                    <DropdownSelect
                                        label="Series2"
                                        selectorValues={seriesList2.map(
                                            series => {
                                                return {
                                                    value: series.id,
                                                    label: series.name,
                                                    id: series.id,
                                                };
                                            }
                                        )}
                                        onChange={e => setSeries2(e)}
                                        initialValue={series2 ? series2 : ''}
                                        id="select-series2-search"
                                    />
                                )}
                                {!build2Loading && (
                                    <DropdownSelect
                                        label="Build2"
                                        selectorValues={buildList2.map(
                                            build => {
                                                return {
                                                    value: build.build_number,
                                                    label: build.build_number,
                                                    id: build.build_number,
                                                };
                                            }
                                        )}
                                        onChange={e => setBuild2(e)}
                                        initialValue={build2 ? build2 : ''}
                                        id="select-build2-search"
                                    />
                                )}
                            </div>
                        </ComparisonFormContainer>
                        {series1 && build1 && series2 && build2 && (
                            <ComparisonAction>
                                <Link
                                    to={`/compare/${series1}/${build1}/to/${series2}/${build2}`}
                                >
                                    Compare
                                </Link>
                            </ComparisonAction>
                        )}
                    </ContentGrid6>
                </ContainerGrid12>
            )}
        </div>
    );
};

export default ComparisonForm;
