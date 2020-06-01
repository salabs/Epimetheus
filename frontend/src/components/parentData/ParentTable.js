import React, { useContext } from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as R from 'ramda';
import ThemeContext from '../../contexts/themeContext';

const ParentTable = props => {
    const theme = useContext(ThemeContext);

    const tableStyles = css`
        ${theme.baseTableStyle}
        font-size: 12px;
        table {
            border-collapse: collapse;
            table-layout: auto;
            overflow: auto;
            max-width: 400px;
        }

        td,
        th {
            vertical-align: middle;
        }
    `;

    const { data, types } = props;

    const headerRow = () => {
        return types.map(name => {
            return <th key={name}>{name}</th>;
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
                <div css={tableStyles}>
                    <table>
                        <thead>
                            <tr>{headerRow()}</tr>
                        </thead>
                        <tbody>
                            <tr>{bodyRow()}</tr>
                        </tbody>
                    </table>
                </div>
            )}
        </React.Fragment>
    );
};

ParentTable.propTypes = {
    data: PropTypes.object,
    types: PropTypes.array.isRequired
};

export default ParentTable;
