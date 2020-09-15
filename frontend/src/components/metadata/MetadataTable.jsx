import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Container,
    HeaderContainer,
    SplitBorder,
    TableContainer,
    DataRow,
} from './MetadataTable.styles';
import { ReactComponent as Up } from '../../images/chevron-up.svg';
import { ReactComponent as Down } from '../../images/chevron-down.svg';

const MetadataTable = ({ name, value }) => {
    const [t] = useTranslation(['metadata']);
    const [Open, setOpen] = useState(true);

    return (
        <Container id="metadata-table">
            <HeaderContainer
                onClick={() => setOpen(!Open)}
                onKeyPress={() => setOpen(!Open)}
                role="button"
                tabIndex="0"
            >
                <p>{t('metadata')}</p>
                <span>{Open ? <Up /> : <Down />}</span>
            </HeaderContainer>
            <SplitBorder open={Open} />
            <TableContainer>
                <DataRow first={true} className={Open ? 'Open' : 'Close'}>
                    <span>{t('name')}</span>
                    {name.map((n, index) => (
                        <span key={index}>{n}</span>
                    ))}
                </DataRow>
                <DataRow className={Open ? 'Open' : 'Close'}>
                    <span>{t('value')}</span>
                    {value.map((v, index) =>
                        v.includes('Http') || v.includes('http') ? (
                            <a href={v} key={index}>
                                {v}
                            </a>
                        ) : (
                            <span key={index}>{v}</span>
                        )
                    )}
                </DataRow>
            </TableContainer>
        </Container>
    );
};

export default MetadataTable;
