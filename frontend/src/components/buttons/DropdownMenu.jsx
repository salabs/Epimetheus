import React from 'react';
import Select, { components } from 'react-select';
import { ReactComponent as Down } from '../../images/caret-down.svg';

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <Down />
        </components.DropdownIndicator>
    );
};

const DropdownMenu = ({ selectorValues, onChange, defaultValue }) => {
    return (
        <>
            <Select
                closeMenuOnSelect={true}
                components={{
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                }}
                defaultValue={selectorValues.filter(
                    option => option.label === defaultValue
                )}
                options={selectorValues}
                onChange={e => onChange(e)}
                styles={{
                    width: '130px',
                    dropdownIndicator: (provided, state) => ({
                        ...provided,
                        transform:
                            state.selectProps.menuIsOpen && 'rotate(180deg)',
                    }),
                    control: styles => ({
                        ...styles,
                        cursor: 'pointer',
                    }),
                    option: (styles, state) => ({
                        ...styles,
                        cursor: 'pointer',
                        backgroundColor: state.isSelected
                            ? 'var(--pirlo-blue)'
                            : styles.backgroundColor,
                    }),
                }}
            />
        </>
    );
};

export default DropdownMenu;
