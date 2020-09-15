// eslint-disable-next-line
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import {
    ButtonContainer,
    Header,
    StyledDiv,
    StyledLabel,
    StyledInput,
    FlexDiv,
} from './LastRunCheckbox.styles';

const Checkbox = ( {direction} ) => {
    // eslint-disable-next-line
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
            <Header>{t('hide_tests.header')}</Header>
            <StyledDiv direction={direction} id="last-run-checkbox-container">
                <StyledLabel labelfor="filterPassed">
                    <StyledInput
                        type="checkbox"
                        name="filterPassed"
                        value="PASS"
                        checked={lastRunFilterPass.isChecked}
                        onChange={e => handlePassFilterChange(e)}
                    />
                    <span>{passFilter ? <Checked /> : <Unchecked />}</span>
                    {t('hide_tests.passing')}
                </StyledLabel>
                <StyledLabel labelfor="filterFailed">
                    <StyledInput
                        type="checkbox"
                        name="filterFailed"
                        value="FAIL"
                        checked={failFilter}
                        onChange={e => handleFailFilterChange(e)}
                    />
                    <span>{failFilter ? <Checked /> : <Unchecked />}</span>
                    {t('hide_tests.failing')}
                </StyledLabel>
            </StyledDiv>
        </ButtonContainer>
    );
};

export default Checkbox;
