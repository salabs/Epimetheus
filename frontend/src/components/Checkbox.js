// eslint-disable-next-line
import React, { useState } from 'react';
import { useQueryParams } from '../hooks/useQuery';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 40px 20px 0px;
`;

const StyledCheckbox = styled.input`
    border: 1px solid #eee;
    border-radius: 10px;
    background-color: white;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
`;

const SelectedCheckbox = styled(StyledCheckbox)`
    background-color: transparent !important;
    border: 2px solid #243b53 !important;
    color: #243b53 !important;
`;

const Header = styled.h3`
    padding-left: 7px;
`;

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
