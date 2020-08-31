import React, { useState } from 'react';
import { useStateValue } from '../../contexts/state';
import { capitalCaseInitial, removeUnderscore } from '../../utils/helpers';
import {
    Container,
    HeaderContainer,
    SplitBorder,
    TableContainer,
    DataRow,
} from './Metadata.styles';
import { ReactComponent as Up } from '../../images/chevron-up.svg';
import { ReactComponent as Down } from '../../images/chevron-down.svg';

const Metadata = () => {
    const [{ metadataState }] = useStateValue();
    const [Open, setOpen] = useState(true);

    const metadata = metadataState.metadata
        ? metadataState.metadata.filter(
              ({ suite_id }) => suite_id === metadataState.metadata[0].suite_id
          )
        : null;

    return (
        <Container id="metadata-table">
            <HeaderContainer
                onClick={() => setOpen(!Open)}
                onKeyPress={() => setOpen(!Open)}
                role="button"
                tabIndex="0"
            >
                <p>Metadata</p>
                <span>{Open ? <Up /> : <Down />}</span>
            </HeaderContainer>
            <SplitBorder />
            <TableContainer>
                <DataRow first={true} className={Open ? 'Open' : 'Close'}>
                    <span>Key</span>
                    {metadata &&
                        metadata.map(({ metadata_name }, index) => (
                            <span key={index}>
                                {removeUnderscore(
                                    capitalCaseInitial(metadata_name)
                                )}
                            </span>
                        ))}
                </DataRow>
                <DataRow className={Open ? 'Open' : 'Close'}>
                    <span>Value</span>
                    {metadata &&
                        metadata.map(({ metadata_value }, index) =>
                            metadata_value.includes('http') ? (
                                <a href={metadata_value} key={index}>
                                    {metadata_value}
                                </a>
                            ) : (
                                <span key={index}>{metadata_value}</span>
                            )
                        )}
                </DataRow>
            </TableContainer>
        </Container>
    );
};

export default Metadata;
