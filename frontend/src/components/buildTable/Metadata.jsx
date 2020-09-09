import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const [t] = useTranslation(['history']);
    const [{ metadataState }] = useStateValue();
    const [Open, setOpen] = useState(true);

    const metadata =
        metadataState && metadataState.metadata
            ? metadataState.metadata.filter(
                  ({ suite_id }) =>
                      suite_id === metadataState.metadata[0].suite_id
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
                <p>{t('build.metadata.metadata')}</p>
                <span>{Open ? <Up /> : <Down />}</span>
            </HeaderContainer>
            <SplitBorder />
            <TableContainer>
                <DataRow first={true} className={Open ? 'Open' : 'Close'}>
                    <span>{t('build.metadata.key')}</span>
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
                    <span>{t('build.metadata.value')}</span>
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
