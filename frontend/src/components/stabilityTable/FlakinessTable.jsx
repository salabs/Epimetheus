import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { StateContext } from '../../contexts/state';
import { TableContainer } from './FlakinessTable.styles';
import { ToggleButtonSmall } from '../../styles/button.styles';
import { BreakWordTd, SimpleTable, WideTh } from '../table/Table.styles';

const StabilityButton = ({ value, text }) => {
    const [t] = useTranslation(['overview']);

    const { state, dispatch } = useContext(StateContext);
    const { stabilityChecker } = state;

    return (
        <ToggleButtonSmall
            role="radio"
            aria-checked={stabilityChecker === value}
            className={stabilityChecker === value ? 'selected' : ''}
            onClick={() => {
                dispatch({
                    type: 'setStabilityChecker',
                    setStability: value,
                });

                document.getElementById(
                    'flakiness-table-status'
                ).textContent = `${t('series.status_update_stability', {
                    value,
                })}`;
            }}
        >
            {text}
        </ToggleButtonSmall>
    );
};

const DashboardList = () => {
    const [t] = useTranslation(['overview']);
    const { seriesId } = useParams();
    const [testStabilityList, setTestStabilityList] = useState();

    const { state, dispatch } = useContext(StateContext);
    const { stabilityChecker, amountOfBuilds, offset } = state;

    useEffect(() => {
        let isSubscribed = true;
        const url = `/data/series/${seriesId}/most_stable_tests/?builds=${amountOfBuilds}&most=${stabilityChecker}&offset=${offset}`;
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (isSubscribed) {
                    setTestStabilityList(json.tests);
                }
            } catch (error) {
                dispatch({ type: 'setErrorState', errorState: error });
            }
        };
        fetchData();
        return () => (isSubscribed = false);
    }, [dispatch, seriesId, stabilityChecker, amountOfBuilds, offset]);

    return (
        <TableContainer>
            <p className="sr-show" role="status" id="flakiness-table-status">
                {' '}
            </p>
            <span role="radiogroup" aria-controls="flakiness-table">
                <StabilityButton
                    value={'unstable'}
                    text={t('series.stability_table.unstable')}
                />
                <StabilityButton
                    value={'stable'}
                    text={t('series.stability_table.stable')}
                />
            </span>
            <SimpleTable id="flakiness-table">
                <thead>
                    <tr>
                        <WideTh>{t('series.stability_table.test_name')}</WideTh>
                        <th>{t('series.stability_table.test_id')}</th>
                        <th>{t('series.stability_table.flakiness')}</th>
                    </tr>
                </thead>
                <tbody>
                    {testStabilityList &&
                        testStabilityList.map(test => {
                            return (
                                <tr key={test.test_id}>
                                    <BreakWordTd>{test.test_name}</BreakWordTd>
                                    <td>{test.test_id}</td>
                                    <td>{test.instability.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </SimpleTable>
        </TableContainer>
    );
};

StabilityButton.propTypes = {
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default DashboardList;
