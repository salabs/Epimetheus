import React from 'react';
import { DropdownWrapper, Label } from './DropdownSelect.styles';
import { Select, Option } from 'react-a11y-select';
import 'react-a11y-select/src/styles.css';

const DropdownSelect = props => {
    const { label, id } = props;
    const selectorValues = props['selector-values'];
    const onChange = props['on-change'];
    const initialValue = props['initial-value'].toString();

    const selectorItems = selectorValues.map(element => {
        return (
            <Option value={element.value.toString()} key={element.id}>
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

export default DropdownSelect;
