// eslint-disable-next-line
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

import { useStateValue } from '../../contexts/state';
import { StyledSelect } from './BuildAmountSelector.styles';

import { Header, ButtonContainer } from './LastRunCheckbox.styles';

const BuildAmountSelector = () => {
    const [, dispatch] = useStateValue();

    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const updateTags = tag => {
        queryParams.set('numberofbuilds', tag);
        return queryParams.toString();
    };

    const handleChange = e => {
        dispatch({
            type: 'setAmountOfBuilds',
            amountOfBuilds: e.target.value,
        });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e.target.value)}`,
            state: {},
        });
    };

    return (
        <ButtonContainer>
            <Header>Builds</Header>
            <StyledSelect onChange={handleChange} id="build_amount_dropdown">
                <option value="5" id="5_option">5</option>
                <option value="10" id="10_option">10</option>
                <option value="15" id="15_option">15</option>
                <option value="30" id="30_option">30</option>
            </StyledSelect>
        </ButtonContainer>
    );
};

export default BuildAmountSelector;
