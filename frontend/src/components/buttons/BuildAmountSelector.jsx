// eslint-disable-next-line
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

import { useStateValue } from '../../contexts/state';
import DropdownMenu from './DropdownMenu';

import { Header, SelectorContainer } from './BuildAmountSelector.styles';

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
            amountOfBuilds: e.value,
        });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e.value)}`,
            state: {},
        });
    };

    const selectorValues = [
        { value: 5, label: 5, id: '5_option' },
        { value: 10, label: 10, id: '10_option' },
        { value: 15, label: 15, id: '15_option' },
        { value: 30, label: 30, id: '30_option' },
    ];

    return (
        <SelectorContainer>
            <Header>Builds</Header>
            <DropdownMenu
                selectorValues={selectorValues}
                onChange={handleChange}
                defaultValue={5}
                id="build_amount_dropdown"
            />
        </SelectorContainer>
    );
};

export default BuildAmountSelector;
