import React from 'react';
import PropTypes from 'prop-types';
import { buildPropType } from '../../utils/PropTypes';
import { useTranslation } from 'react-i18next';
import { SimpleTable } from '../table/Table.styles';

const FailuresTable = ({ failures }) => {
    const [t] = useTranslation(['overview']);
    return (
        <SimpleTable>
            <thead>
                <tr>
                    <th>{t('series.last_build.suite')}</th>
                    <th>{t('series.last_build.test_case')}</th>
                </tr>
            </thead>
            <tbody>
                {failures.map(x => {
                    return (
                        <tr key={x.id}>
                            <td>{x.suite}</td>
                            <td>{x.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </SimpleTable>
    );
};

FailuresTable.propTypes = {
    failures: PropTypes.arrayOf(
        PropTypes.shape({
            failures: PropTypes.arrayOf(buildPropType),
            id: PropTypes.number,
            name: PropTypes.string,
            suite: PropTypes.string,
        })
    ).isRequired,
};

export default FailuresTable;
