// Not used anywhere!

import React from 'react';
import { useQueryParams } from '../../hooks/useQuery';
import { useHistory, useLocation } from 'react-router-dom';
import {
    CheckboxContainer,
    StyledCheckbox,
    SelectedCheckbox,
    Header,
} from './Checkbox.styles';

const Checkbox = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const updateTags = tag => {
        let tagList = queryParams.getAll('tag');
        tagList.indexOf(tag) !== -1
            ? tagList.splice(tagList.indexOf(tag), 1)
            : tagList.push(tag);
        queryParams.delete('tag');
        tagList.forEach(element => queryParams.append('tag', element));
        return queryParams.toString();
    };

    const handleFilterChange = e => {
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e.target.value)}`,
            state: {},
        });
    };

    return (
        <CheckboxContainer id="history-checkbox-container">
            <Header>Hide tests</Header>
            {queryParams.getAll('tag').includes('Passing') === true ? (
                <SelectedCheckbox
                    type="button"
                    value={'Passing'}
                    className={'selected'}
                    onClick={e => handleFilterChange(e)}
                />
            ) : (
                <StyledCheckbox
                    type="button"
                    value={'Passing'}
                    className={' '}
                    onClick={e => handleFilterChange(e)}
                />
            )}
            {queryParams.getAll('tag').includes('Failing') === true ? (
                <SelectedCheckbox
                    type="button"
                    value={'Failing'}
                    className={'selected'}
                    onClick={e => handleFilterChange(e)}
                />
            ) : (
                <StyledCheckbox
                    type="button"
                    value={'Failing'}
                    className={' '}
                    onClick={e => handleFilterChange(e)}
                />
            )}
        </CheckboxContainer>
    );
};

export default Checkbox;
