import React from 'react';
import PropTypes from 'prop-types';
import { DropdownWrapper, Label } from './DropdownSelect.styles';
import { Select, Option } from 'react-a11y-select';
import 'react-a11y-select/src/styles.css';

const DropdownSelect = props => {
    const { label, selectorValues, onChange, id } = props;
    const initialValue = props.initialValue.toString();

    const selectorItems = selectorValues.map(element => {
        return (
            <Option
                value={element.value.toString()}
                label={element.label.toString()}
                key={element.id}
            >
                {element.label}
            </Option>
        );
    });

    return (
        <DropdownWrapper>
            <Label id={label}>{label}</Label>
            <div aria-labelledby={label}>
                <Select
                    label={label}
                    onChange={onChange}
                    initialValue={initialValue}
                    buttonId={id}
                >
                    {selectorItems}
                </Select>
            </div>
        </DropdownWrapper>
    );
};

DropdownSelect.propTypes = {
    label: PropTypes.string.isRequired,
    selectorValues: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.node.isRequired,
            label: PropTypes.node.isRequired,
            id: PropTypes.node.isRequired,
        })
    ),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    initialValue: PropTypes.node.isRequired,
};

export default DropdownSelect;
