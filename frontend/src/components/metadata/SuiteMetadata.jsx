import React from 'react';
import MetadataTable from './MetadataTable';
import { useStateValue } from '../../contexts/state';

const SuiteMetadata = () => {
    const [{ selectedSuiteState }] = useStateValue();

    const name = [
        'Suite Id:',
        'Name:',
        'Full name:',
        'Repository:',
        'Starttime:',
    ];

    const value = selectedSuiteState && [
        selectedSuiteState.suite.id.toString(),
        selectedSuiteState.suite.name,
        selectedSuiteState.suite.full_name,
        selectedSuiteState.suite.repository,
        selectedSuiteState.suite.start_time
            ? selectedSuiteState.suite.start_time.slice(0, 16)
            : '',
    ];

    return selectedSuiteState && <MetadataTable name={name} value={value} />;
};

export default SuiteMetadata;
