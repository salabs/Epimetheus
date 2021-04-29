import React from 'react';
import PropTypes from 'prop-types';
import { buildPropType } from '../../utils/PropTypes';
import { pickIcon } from '../../utils/TestIcon';

const Status = ({ build, selectedBuild }) => {
    const testStatus =
        Number(selectedBuild) === build.build_number
            ? build.test_status
            : 'EMPTY';

    const testStatusIcon = pickIcon(testStatus);
    return <td>{testStatusIcon}</td>;
};

Status.propTypes = {
    build: buildPropType.isRequired,
    selectedBuild: PropTypes.string.isRequired,
};

export default Status;
