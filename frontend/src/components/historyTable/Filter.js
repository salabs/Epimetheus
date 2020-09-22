// eslint-disable-next-line
import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

import styled from 'styled-components';

const FilterContainer = styled.div`
    padding: 20px 40px 20px 0px;
`;

const StyledButtonGroup = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
`;

const StyledInput = styled.input`
    border: 1px solid #eee;
    width: 100px;
    border-radius: 10px;
    background-color: var(--nero-white);
    padding: 5px;
    margin: 5px;
    cursor: pointer;
`;

const SelectedInput = styled(StyledInput)`
    background-color: transparent !important;
    border: 2px solid var(--gradient-black) !important;
    color: var(--gradient-black) !important;
`;

const StyledLabel = styled.label`
    padding-left: 7px;
`;

const Filter = ({ direction }) => {
    // eslint-disable-next-line
    const options = [5, 10, 15, 30, 100];

    return (
        <FilterContainer id="history-filter-container">
            <h3>
                <StyledLabel htmlFor="history-filter">
                    Display builds
                </StyledLabel>
            </h3>
            <ButtonGroup options={options} direction={direction} />
        </FilterContainer>
    );
};

const FilterButton = ({ title }) => {
    const [{ amountOfBuilds }, dispatch] = useStateValue();
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const updateTags = tag => {
        queryParams.set('numberofbuilds', tag);
        return queryParams.toString();
    };

    const handleFilterChange = e => {
        dispatch({ type: 'setAmountOfBuilds', amountOfBuilds: title });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(e.target.value)}`,
            state: {},
        });
    };

    if (title === parseInt(amountOfBuilds, 10)) {
        return (
            <SelectedInput
                type="button"
                value={title}
                onClick={e => handleFilterChange(e)}
                className={title === 'selected'}
            />
        );
    } else {
        return (
            <StyledInput
                type="button"
                value={title}
                onClick={e => handleFilterChange(e)}
                className={title === 'disabled'}
            />
        );
    }
};

const ButtonGroup = ({ options, direction }) => {
    return (
        <StyledButtonGroup id={'button-group'} direction={direction}>
            {options.map((i, index) => {
                return <FilterButton title={i} key={index} />;
            })}
        </StyledButtonGroup>
    );
};
export default Filter;
