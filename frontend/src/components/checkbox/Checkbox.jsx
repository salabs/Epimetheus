import React from 'react';
import PropTypes from 'prop-types';
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

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Checkbox;
