import React from 'react';
import MetadataTable from './MetadataTable';
import { capitalCaseInitial, removeUnderscore } from '../../utils/helpers';
import { useStateValue } from '../../contexts/state';

const BuildMetadata = () => {
    const [{ metadataState }] = useStateValue();

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

    return metadata && <MetadataTable name={name} value={value} />;
};

export default BuildMetadata;
