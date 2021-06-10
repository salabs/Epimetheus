import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';
import DropdownSelect from '../dropdown/DropdownSelect';
import { SelectorContainer } from './BuildAmountSelector.styles';
import { useTranslation } from 'react-i18next';
import { StateContext } from '../../contexts/state';

const BuildAmountSelector = () => {
    const [t] = useTranslation(['buttons']);

    const { state, dispatch } = useContext(StateContext);
    const { amountOfBuilds } = state;

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
            amountOfBuilds: parseInt(e),
        });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e)}`,
            state: {},
        });
    };

    const selectorValues = [
        { value: 5, label: 5, id: '5_option' },
        { value: 10, label: 10, id: '10_option' },
        { value: 15, label: 15, id: '15_option' },
        { value: 30, label: 30, id: '30_option' },
    ];
    //Note: the dropdown select id "build_amount_dropdown" is used in test automation.
    return (
        <SelectorContainer>
            <DropdownSelect
                label={t('Builds')}
                selectorValues={selectorValues}
                onChange={handleChange}
                initialValue={amountOfBuilds}
                id="build_amount_dropdown"
            />
        </SelectorContainer>
    );
};

export default BuildAmountSelector;
