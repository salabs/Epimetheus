import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';

const Row = ({ full_name, status1, status2 }) => {
    return (
        <tr>
            <td>{full_name}</td>
            <Status status={status1} />
            <Status status={status2} />
        </tr>
    );
};

Row.propTypes = {
    full_name: PropTypes.string.isRequired,
    status1: PropTypes.string.isRequired,
    status2: PropTypes.string.isRequired,
};

export default Row;
