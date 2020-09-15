// eslint-disable-next-line
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import {
    StyledDiv,
    StyledDirectionButton,
    LatestButton,
    FlexDiv,
    StyledEndLeft,
} from './OffSetButtons.styles';


import {
    Header,
    ButtonContainer,
} from './LastRunCheckbox.styles'


import { ReactComponent as Left } from '../../images/chevron-left.svg';
import { ReactComponent as Right } from '../../images/chevron-right.svg';
const Offset = () => {

    const [{ lastRunFilterPass, lastRunFilterFail }, dispatch] = useStateValue();
    const [passFilter, setPassFilter] = useState(lastRunFilterPass.isChecked);
    const [failFilter, setFailFilter] = useState(lastRunFilterFail.isChecked);

    const [t] = useTranslation(['buttons']);

    const handlePassFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterPass',
            filterType: passFilter ? '' : e.target.value,
            isChecked: !passFilter,
        });

        setPassFilter(!passFilter);
    };

    const handleFailFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterFail',
            filterType: failFilter ? '' : e.target.value,
            isChecked: !failFilter,
        });

        setFailFilter(!failFilter);
    };

    return (
        <ButtonContainer>
            <Header>Offset</Header>
            <FlexDiv id="offset_container">
                <LatestButton><StyledEndLeft /> LATEST</LatestButton>
                <StyledDirectionButton><Left /></StyledDirectionButton>
                <StyledDirectionButton>0</StyledDirectionButton>
                <StyledDirectionButton><Right /></StyledDirectionButton>
            </FlexDiv>
        </ButtonContainer>
    );
}

export default Offset;
