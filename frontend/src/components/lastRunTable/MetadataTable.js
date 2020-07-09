// eslint-disable-next-line
import React, { useContext } from 'react';
import { useStateValue } from '../../contexts/state';
import styled from 'styled-components';
import { baseTable } from '../../styles/baseComponents';

const StyledTable = styled(baseTable)`
    overflow: auto;
    margin-bottom: 10px;
    margin-top: 20px;
`;

const MetadataTable = () => {
    const [{ metadataState }] = useStateValue();
    const metadata = metadataState.metadata
        ? metadataState.metadata.filter(
              ({ suite_id }) => suite_id === metadataState.metadata[0].suite_id
          )
        : null;

    return (
        <div>
            <StyledTable id="metadata-table">
                <thead>
                    <tr>
                        <th>Metadata</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {metadata !== null &&
                        metadata.map(
                            ({ metadata_name, metadata_value }, index) => {
                                const value =
                                    metadata_value.length > 200
                                        ? `${metadata_value.substring(
                                              0,
                                              200
                                          )}...`
                                        : metadata_value;
                                return (
                                    <tr key={index}>
                                        <td>{metadata_name}</td>
                                        <td>{value}</td>
                                    </tr>
                                );
                            }
                        )}
                </tbody>
            </StyledTable>
        </div>
    );
};

export default MetadataTable;
