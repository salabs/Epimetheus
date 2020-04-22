import React, { useEffect } from 'react';
import { useStateValue } from '../contexts/state';
import Card from '../components/Card';
import { useParams } from 'react-router';
import SelectedTeam from '../components/SelectedTeam';
import theme from '../styles/theme';

const Team = () => {
    const [{ loadingState, teamsState }, dispatch] = useStateValue();

    const { name } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'setLoadingState', loadingState: true });

            try {
                const res = await fetch('/data/teams', {});
                const json = await res.json();
                dispatch({ type: 'setLoadingState', loadingState: false });
                dispatch({ type: 'setTeams', teams: json.teams });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <main id="team" css={theme.loadingState}>
            {!teamsState || loadingState ? (
                <div
                    className="loading-state"
                    role="status"
                    aria-live="polite"
                    aria-label="Loading"
                    aria-relevant="all"
                >
                    Loading
                </div>
            ) : name ? (
                <SelectedTeam
                    selectedTeam={teamsState.find(
                        element => element.name === name
                    )}
                />
            ) : (
                <div>
                    <h1>Teams</h1>
                    {teamsState.map(({ name, series_count, series }, i) => {
                        return (
                            <Card
                                team={name}
                                numberOfSeries={series_count}
                                key={i}
                            />
                        );
                    })}
                </div>
            )}
        </main>
    );
};
export default Team;
