import React from 'react';
import StatusCount from '../../components/graphs/StatusCount';
import { suiteLabels, testLabels } from '../../utils/graphTypes';

const Build = () => {
    return (
        <>
            <StatusCount labels={suiteLabels} />{' '}
            <StatusCount labels={testLabels} />
        </>
    );
};

export default Build;
