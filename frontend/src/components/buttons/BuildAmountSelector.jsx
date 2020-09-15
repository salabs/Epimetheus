// eslint-disable-next-line
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import {
    StyledSelect,
} from './BuildAmountSelector.styles';

import {
    Header,
    ButtonContainer,
} from './LastRunCheckbox.styles'

const BuildAmountSelector = () => {
    return (    
        <ButtonContainer>
            <Header>Builds</Header>
            <StyledSelect>
                <option>5</option>
                <option>10</option>
                <option>15</option>
            </StyledSelect>
        </ButtonContainer>
    )
}


export default BuildAmountSelector;