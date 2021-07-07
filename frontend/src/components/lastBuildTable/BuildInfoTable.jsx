import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SimpleTable, WideTh } from '../table/Table.styles';
import { StateContext } from '../../contexts/state';
import { StatusSpan } from '../parentData/ParentTable.styles';

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
                    <td>
                        <StatusSpan status={seriesData.last_status}>
                            {seriesData.last_status}
                        </StatusSpan>
                    </td>
                </tr>
            </tbody>
        </SimpleTable>
    );
};

export default BuildInfoTable;
