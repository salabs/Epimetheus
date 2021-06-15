import React from 'react';
import PropTypes from 'prop-types';
import { pickIcon } from '../../utils/TestIcon';

const Status = ({ status }) => {
    const testStatusIcon = pickIcon(status);
    return <td style={{ textAlign: 'center' }}>{testStatusIcon}</td>;
};

Status.propTypes = {
    status: PropTypes.string.isRequired,
};

export default Status;
