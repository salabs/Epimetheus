import React from 'react';
import PropTypes from 'prop-types';
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

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Checkbox;
