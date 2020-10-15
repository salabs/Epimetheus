import React from 'react';
import PropTypes from 'prop-types';
import NotFound from '../NotFound';
import { useHistory, useLocation } from 'react-router-dom';
import { useStateValue } from '../../contexts/state';
import theme from '../../styles/theme';
import BreadcrumbNav from '../BreadcrumbNav';
import { pickIcon } from '../TestIcon';
import { useTranslation } from 'react-i18next';
import {
    CardContainer,
    CardSection,
    HoverDiv,
    H5,
    H4,
    StatusSpan,
    InfoContainer,
    CardValue,
    SelectedTeamContainer,
    SeriesCount,
} from './SelectedTeam.styles';

const TeamCard = ({ data }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();

    const {
        id,
        name,
        builds,
        last_build,
        last_build_id,
        last_started,
        last_status,
    } = data;

    const LastStarted = last_started.slice(0, 16);
    const testStatusIcon = pickIcon(last_status);
    return (
        <CardSection>
            <header>
                <H4>{name}</H4>
                <CardValue className="cardValue">{testStatusIcon}</CardValue>
            </header>
            <HoverDiv
                className="series"
                onClick={() => history.push(`/series/${id}/overview`)}
                role={'presentation'}
            >
                <InfoContainer className="cardInfoContainer">
                    {t('card.series.builds')}{' '}
                    <CardValue className="cardValue">{builds}</CardValue>
                </InfoContainer>
            </HoverDiv>
            <HoverDiv
                className="builds"
                onClick={() =>
                    history.push(`/series/${id}/build/${last_build}/overview`)
                }
                role={'presentation'}
            >
                <H5>
                    {t('card.last_build.title')} {last_build}
                </H5>
                <InfoContainer className="cardInfoContainer">
                    {t('card.last_build.build_id')}:{' '}
                    <CardValue className="cardValue">{last_build_id}</CardValue>
                </InfoContainer>
                <InfoContainer className="cardInfoContainer">
                    {t('card.last_build.last_build_started')}:{' '}
                    <CardValue className="cardValue">{LastStarted}</CardValue>
                </InfoContainer>
                <InfoContainer className="cardInfoContainer">
                    {t('card.last_build.last_status')}:{' '}
                    <StatusSpan className="cardValue" status={last_status}>
                        {last_status}
                    </StatusSpan>
                </InfoContainer>
            </HoverDiv>
        </CardSection>
    );
};

const SelectedTeam = ({ selectedTeam }) => {
    const [t] = useTranslation(['team']);
    let location = useLocation();
    const teamName = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    );

    const [{ teamsState }] = useStateValue();
    const seriesCount = teamsState.find(team => team.name.includes(teamName))
        .series_count;

    return (
        <main id="selectedTeam" css={theme.loadingState}>
            <BreadcrumbNav status={'team'} />
            {selectedTeam && selectedTeam.all_builds ? (
                <SelectedTeamContainer>
                    <header>
                        <h2>
                            {t('card.last_build.header')} {teamName}
                        </h2>
                        <div>
                            <SeriesCount>
                                {seriesCount} {t('card.last_build.series')}{' '}
                            </SeriesCount>
                        </div>
                    </header>
                    <CardContainer>
                        <TeamCard data={selectedTeam.all_builds} />
                        {selectedTeam.series.reverse().map((serie, i) => {
                            return <TeamCard key={i} data={serie} />;
                        })}
                    </CardContainer>
                </SelectedTeamContainer>
            ) : (
                <NotFound />
            )}
        </main>
    );
};

SelectedTeam.propTypes = {
    selectedTeam: PropTypes.shape({
        all_builds: PropTypes.object,
        name: PropTypes.string,
        series: PropTypes.array,
        series_count: PropTypes.number,
    }),
};

export default SelectedTeam;
