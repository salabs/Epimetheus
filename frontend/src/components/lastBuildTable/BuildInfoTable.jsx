import React from 'react';
import { useStateValue } from '../../contexts/state';
import { useTranslation } from 'react-i18next';
import { SimpleTable, WideTh } from '../table/Table.styles';

const BuildInfoTable = () => {
    const [t] = useTranslation(['overview']);
    const [
        {
            parentData: { seriesData },
        },
    ] = useStateValue();
    return (
        <SimpleTable>
            <tbody>
                <tr>
                    <WideTh>{t('series.last_build.id')}</WideTh>
                    <td>{seriesData.last_build_id}</td>
                </tr>
                <tr>
                    <WideTh>{t('series.last_build.start_time')}</WideTh>
                    <td>{seriesData.last_started}</td>
                </tr>
                <tr>
                    <WideTh>{t('series.last_build.status')}</WideTh>
                    <td>{seriesData.last_status}</td>
                </tr>
            </tbody>
        </SimpleTable>
    );
};

export default BuildInfoTable;
