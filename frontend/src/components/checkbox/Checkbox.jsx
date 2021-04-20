import React from 'react';
import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import { StyledCheckbox, StyledLabel } from './Checkbox.styles';

const Checkbox = ({ checked, onChange, value, label }) => {
    return (
        <StyledLabel>
            <StyledCheckbox
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span>{checked ? <Checked /> : <Unchecked />}</span>
            {label}
        </StyledLabel>
    );
};

export default Checkbox;
