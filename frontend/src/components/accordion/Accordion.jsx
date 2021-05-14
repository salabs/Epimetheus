import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import {
    Container,
    HeaderContainer,
    Content,
    SplitBorder,
} from './Accordion.styles';
import SvgIcon from '../../images/SvgIcon';
import ExternalLink from '../externalLink/ExternalLink';
import { NarrowTh, SimpleTable } from '../table/Table.styles';

const Accordion = ({ header, name, value }) => {
    const [t] = useTranslation(['accordion']);
    const [open, setOpen] = useState(true);
    const nameValuePairTable = [];
    const id = uuidv4();

    if (name.length === value.length) {
        for (let i = 0; i < name.length; i++) {
            nameValuePairTable.push({ name: name[i], value: value[i] });
        }
    }

    return (
        <Container>
            <HeaderContainer
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={id}
            >
                <p>{header}</p>
                <span className="caret">
                    {open ? (
                        <SvgIcon svg="chevron-up" />
                    ) : (
                        <SvgIcon svg="chevron-down" />
                    )}
                </span>
            </HeaderContainer>
            <Content className={open ? 'Open' : 'Close'} id={id}>
                <SplitBorder />
                <SimpleTable id="datatable">
                    <thead>
                        <tr>
                            <NarrowTh>{t('name')}</NarrowTh>
                            <th>{t('value')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nameValuePairTable.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {item.value.includes('Http') ||
                                    item.value.includes('http') ? (
                                        <ExternalLink
                                            url={item.value}
                                            label={item.value}
                                        />
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

Accordion.propTypes = {
    header: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired,
};

export default Accordion;
