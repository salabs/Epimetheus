import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { baseTable } from '../../styles/baseComponents';
import styled from 'styled-components';
const StyledTable = styled(baseTable)`
    border-collapse: collapse;
    table-layout: auto;
    overflow: auto;
    max-width: 400px;

    td,
    th {
        vertical-align: middle;
    }
    td:first-of-type {
        vertical-align: middle;
    }
`;

const ParentTable = props => {
    const { data, types } = props;

    const headerRow = () => {
        return types.map(name => {
            const CapitalCaseInitial =
                name.charAt(0).toUpperCase() + name.slice(1);
            return <th key={name}>{CapitalCaseInitial}</th>;
        });
    };

    const bodyRow = () => {
        const bodyValues = R.props(types, data);

        return bodyValues.map((value, index) => {
            return <td key={index}>{value}</td>;
        });
    };

    return (
        <React.Fragment>
            {data && (
                <div>
                    <StyledTable>
                        <thead>
                            <tr>{headerRow()}</tr>
                        </thead>
                        <tbody>
                            <tr>{bodyRow()}</tr>
                        </tbody>
                    </StyledTable>
                </div>
            )}
        </React.Fragment>
    );
};

ParentTable.propTypes = {
    data: PropTypes.object,
    types: PropTypes.array.isRequired,
};

export default ParentTable;
