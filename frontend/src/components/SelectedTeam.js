import React from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import { useHistory } from 'react-router-dom';
import theme from '../styles/theme';
import BreadcrumbNav from './BreadcrumbNav';
import { pickIcon } from './TestIcon';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const CardStyles = styled.div`
    background-color: var(--nero-white);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 4px, rgba(0, 0, 0, 0.23) 0px 3px 4px;
    margin: 10px;
    padding: 10px;
    line-height: 16px;
`;

const HoverDiv = styled.div`
    :hover {
        cursor: pointer;
    }
`;

const H3 = styled.h3`
    font-size: 16px;
    line-height: 20px;
    margin-top: 0;
`;
const H4 = styled.h4`
    font-size: 16px;
    line-height: 20px;
`;

const CardInfo = styled.div`
    @media only screen and (min-width: 1024px) {
        min-width: 440px;
        min-height: 220px;
    }
`;

const InfoContainer = styled.div`
    :hover {
        background-color: var(--hermanni-grey);
    }
`;

const CardValue = styled.span`
    color: var(--pirlo-blue);
`;

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
        <CardStyles>
            <div>
                <H3>{name}</H3>
            </div>
            <CardInfo className="card">
                <HoverDiv
                    className="series"
                    onClick={() => history.push(`/series/${id}/dashboard`)}
                    role={'presentation'}
                >
                    <H4>{t('card.series.title')}</H4>
                    <InfoContainer className="cardInfoContainer">
                        {t('card.series.builds')}:{' '}
                        <CardValue className="cardValue">{builds}</CardValue>
                    </InfoContainer>
                </HoverDiv>
                <HoverDiv
                    className="builds"
                    onClick={() =>
                        history.push(
                            `/series/${id}/build/${last_build}/dashboard`
                        )
                    }
                    role={'presentation'}
                >
                    <H4>{t('card.last_build.title')}</H4>
                    <InfoContainer className="cardInfoContainer">
                        {t('card.last_build.build_number')}:{' '}
                        <CardValue className="cardValue">
                            {last_build}
                        </CardValue>
                    </InfoContainer>
                    <InfoContainer className="cardInfoContainer">
                        {t('card.last_build.build_id')}:{' '}
                        <CardValue className="cardValue">
                            {last_build_id}
                        </CardValue>
                    </InfoContainer>
                    <InfoContainer className="cardInfoContainer">
                        {t('card.last_build.last_build_started')}:{' '}
                        <CardValue className="cardValue">
                            {LastStarted}
                        </CardValue>
                    </InfoContainer>
                    <InfoContainer className="cardInfoContainer">
                        {t('card.last_build.last_status')}:{' '}
                        <CardValue className="cardValue">
                            {testStatusIcon}
                        </CardValue>
                    </InfoContainer>
                </HoverDiv>
            </CardInfo>
        </CardStyles>
    );
};

const SelectedTeam = ({ selectedTeam }) => {
    const flexContainer = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '20px',
    };

    return (
        <main id="selectedTeam" css={theme.loadingState}>
            <BreadcrumbNav status={'team'} />
            {selectedTeam && selectedTeam.all_builds ? (
                <div style={flexContainer}>
                    <TeamCard data={selectedTeam.all_builds} />
                    {selectedTeam.series.reverse().map((serie, i) => {
                        return <TeamCard key={i} data={serie} />;
                    })}
                </div>
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
