import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: var(--nero-white);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 4px, rgba(0, 0, 0, 0.23) 0px 3px 4px;
    margin: 10px;
    padding: 10px;
    line-height: 16px;
    min-height: 120px;
    width: 300px;
    height: 200px;
    cursor: pointer;

    @media only screen and (min-width: 1024px) {
        width: 400px;
    }
`;

const StyledSpan = styled.span`
    color: var(--pirlo-blue);
`;

const Card = ({ team, numberOfSeries }) => {
    const [t] = useTranslation(['team']);
    let history = useHistory();

    return (
        <StyledDiv
            onClick={() => history.push(`/team/${team}`)}
            role={'presentation'}
        >
            <h3>{team}</h3>
            <div>
                {t('series')}:{' '}
                <StyledSpan className="test">{numberOfSeries}</StyledSpan>
            </div>
        </StyledDiv>
    );
};

export default Card;
