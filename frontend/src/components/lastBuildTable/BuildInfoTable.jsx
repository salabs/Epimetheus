import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleTable, WideTh } from '../table/Table.styles';
import { StateContext } from '../../contexts/state';

const BuildInfoTable = () => {
    const [t] = useTranslation(['overview']);

    const { state } = useContext(StateContext);
    const {
        parentData: { seriesData },
    } = state;

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
