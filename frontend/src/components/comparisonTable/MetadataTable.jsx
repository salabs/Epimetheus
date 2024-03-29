import React, { useContext } from 'react';
import { Table } from '../table/Table';
import { StateContext } from '../../contexts/state';

const MetadataTable = () => {
    const { state } = useContext(StateContext);
    const {
        metadataState,
        parentData: { buildData },
    } = state;

    const metadata = metadataState.metadata
        ? metadataState.metadata.filter(
              ({ suite_id }) => suite_id === metadataState.metadata[0].suite_id
          )
        : null;

    return (
        buildData && (
            <Table simpleTable={true} tableId="metadata3-table">
                <thead>
                    <tr>
                        <th>Metadata</th>
                        <th>{buildData.name}</th>
                        <th>{buildData.name2}</th>
                    </tr>
                </thead>
                <tbody>
                    {metadata !== null &&
                        metadata.map(
                            (
                                {
                                    metadata_name,
                                    metadata_value,
                                    metadata2_value,
                                },
                                index
                            ) => {
                                const value =
                                    metadata_value.length > 200
                                        ? `${metadata_value.substring(
                                              0,
                                              200
                                          )}...`
                                        : metadata_value;
                                const value2 =
                                    metadata2_value.length > 200
                                        ? `${metadata2_value.substring(
                                              0,
                                              200
                                          )}...`
                                        : metadata2_value;
                                return (
                                    <tr key={index}>
                                        <td>{metadata_name}</td>
                                        <td>{value}</td>
                                        <td>{value2}</td>
                                    </tr>
                                );
                            }
                        )}
                </tbody>
            </Table>
        )
    );
};

export default MetadataTable;
