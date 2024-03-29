﻿import React, { useContext } from 'react';
import Accordion from '../accordion/Accordion';
import { capitalCaseInitial, removeUnderscore } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';
import { StateContext } from '../../contexts/state';

const BuildMetadata = () => {
    const [t] = useTranslation(['accordion']);

    const { state } = useContext(StateContext);
    const { metadataState } = state;

    const metadata =
        metadataState && metadataState.metadata
            ? metadataState.metadata.filter(
                  ({ suite_id }) =>
                      suite_id === metadataState.metadata[0].suite_id
              )
            : null;

    const name =
        metadata &&
        metadata.map(({ metadata_name }) =>
            removeUnderscore(capitalCaseInitial(metadata_name))
        );
    const value =
        metadata &&
        metadata.map(({ metadata_value }) =>
            removeUnderscore(capitalCaseInitial(metadata_value))
        );

    return metadata ? (
        <Accordion header={t('metadata')} name={name} value={value} />
    ) : (
        <div>No metadata found</div>
    );
};

export default BuildMetadata;
