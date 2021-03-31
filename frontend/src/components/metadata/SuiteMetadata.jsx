import React from 'react';
import Accordion from '../accordion/Accordion';
import { useStateValue } from '../../contexts/state';
import { useTranslation } from 'react-i18next';

const SuiteMetadata = () => {
    const [t] = useTranslation(['accordion']);
    const [{ selectedSuiteState }] = useStateValue();

    const name = ['Suite Id', 'Name', 'Full name', 'Repository', 'Start time'];

    const value = selectedSuiteState && [
        selectedSuiteState.suite.id.toString(),
        selectedSuiteState.suite.name,
        selectedSuiteState.suite.full_name,
        selectedSuiteState.suite.repository,
        selectedSuiteState.suite.start_time
            ? selectedSuiteState.suite.start_time.slice(0, 16)
            : '',
    ];

    return (
        selectedSuiteState && (
            <Accordion header={t('metadata')} name={name} value={value} />
        )
    );
};

export default SuiteMetadata;
