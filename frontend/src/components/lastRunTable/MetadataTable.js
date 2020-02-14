// eslint-disable-next-line
import React, { useContext } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ThemeContext from '../../contexts/themeContext';
import { useStateValue } from '../../contexts/state';

const MetadataTable = () => {
  const [{ metadataState }] = useStateValue();
  const theme = useContext(ThemeContext);

  const tableStyles = css`
    ${theme.baseTableStyle}
    overflow: auto;
    margin-bottom: 10px;
    margin-top: 20px;
  `;

  const metadata = metadataState.metadata
    ? metadataState.metadata.filter(
        ({ suite_id }) => suite_id === metadataState.metadata[0].suite_id
      )
    : null;

  return (
    <div css={tableStyles}>
      <table id="metadata-table">
        <thead>
          <tr>
            <th>Metadata</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {metadata !== null &&
            metadata.map(({ metadata_name, metadata_value }, index) => {
              const value =
                metadata_value.length > 200
                  ? `${metadata_value.substring(0, 200)}...`
                  : metadata_value;
              return (
                <tr key={index}>
                  <td>{metadata_name}</td>
                  <td>{value}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default MetadataTable;
