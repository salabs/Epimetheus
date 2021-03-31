import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import {
    Container,
    HeaderContainer,
    Content,
    SplitBorder,
} from './Accordion.styles';
import { ReactComponent as Up } from '../../images/chevron-up.svg';
import { ReactComponent as Down } from '../../images/chevron-down.svg';
import { SimpleTable } from '../table/Table.styles';

const Accordion = ({ header, name, value }) => {
    const [t] = useTranslation(['accordion']);
    const [Open, setOpen] = useState(true);
    const NameValuePairTable = [];
    const id = uuidv4();

    if (name.length === value.length) {
        for (let i = 0; i < name.length; i++) {
            NameValuePairTable.push({ name: name[i], value: value[i] });
        }
    }

    return (
        <Container>
            <HeaderContainer
                onClick={() => setOpen(!Open)}
                aria-expanded={Open}
                aria-controls={id}
            >
                <p>{header}</p>
                <span className="caret">{Open ? <Up /> : <Down />}</span>
            </HeaderContainer>
            <Content className={Open ? 'Open' : 'Close'} id={id}>
                <SplitBorder />
                <SimpleTable id="datatable">
                    <thead>
                        <tr>
                            <th>{t('name')}</th>
                            <th>{t('value')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NameValuePairTable.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {item.value.includes('Http') ||
                                    item.value.includes('http') ? (
                                        <a href={item.value}>{item.value}</a>
                                    ) : (
                                        <span key={index}>{item.value}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </SimpleTable>
            </Content>
        </Container>
    );
};

export default Accordion;
