import React from 'react';
import { useStateValue } from '../../contexts/state';

const Metadata3Table = () => {
    const [
        {
            metadataState,
            parentData: { buildData },
        },
    ] = useStateValue();

    const metadata = metadataState.metadata
        ? metadataState.metadata.filter(
              ({ suite_id }) => suite_id === metadataState.metadata[0].suite_id
          )
        : null;

    return (
        buildData && (
            <table id="metadata3-table">
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
            </table>
        )
    );
};

export default Metadata3Table;
