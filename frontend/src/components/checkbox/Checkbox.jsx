import React from 'react';
import SvgIcon from '../../images/SvgIcon';
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
            <span>
                {checked ? (
                    <SvgIcon svg="checked" />
                ) : (
                    <SvgIcon svg="unchecked" />
                )}
            </span>
            {label}
        </StyledLabel>
    );
};

export default Checkbox;
