/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { useQueryParams } from '../../hooks/useQuery';
import { useHistory, useLocation } from 'react-router-dom';
import Checkbox from '../checkbox/Checkbox';
import { Header, StyledDiv } from './LastRunCheckbox.styles';

const LastRunCheckbox = ({ direction }) => {
    // eslint-disable-next-line
    const [{ lastRunFilterPass, lastRunFilterFail }, dispatch] = useStateValue();
    const [passFilter, setPassFilter] = useState(lastRunFilterPass.isChecked);
    const [failFilter, setFailFilter] = useState(lastRunFilterFail.isChecked);

    const [t] = useTranslation(['buttons']);

    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        const tags = queryParams.getAll('tag') || 'Passing';
        if (tags.includes('Passing')) {
            setPassFilter(true);
        }
        if (tags.includes('Failing')) {
            setFailFilter(true);
        }
    }, []);

    const updateTags = tag => {
        let tagList = queryParams.getAll('tag');
        tagList.indexOf(tag) !== -1
            ? tagList.splice(tagList.indexOf(tag), 1)
            : tagList.push(tag);
        queryParams.delete('tag');
        tagList.forEach(element => queryParams.append('tag', element));
        return queryParams.toString();
    };

    const handlePassFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterPass',
            filterType: passFilter ? '' : e.target.value,
            isChecked: !passFilter,
        });

        setPassFilter(!passFilter);
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags('Passing')}`,
            state: {},
        });
    };

    const handleFailFilterChange = e => {
        dispatch({
            type: 'setLastRunFilterFail',
            filterType: failFilter ? '' : e.target.value,
            isChecked: !failFilter,
        });

        setFailFilter(!failFilter);
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags('Failing')}`,
            state: {},
        });
    };

    return (
        <div>
            <Header>{t('hide_tests.header')}</Header>
            <StyledDiv
                direction={direction}
                robot_id="last-run-checkbox-container"
                id="last-run-checkbox-container"
            >
                <Checkbox
                    checked={passFilter}
                    onChange={e => handlePassFilterChange(e)}
                    value="PASS"
                    label={t('hide_tests.passing')}
                />
                <Checkbox
                    checked={failFilter}
                    onChange={e => handleFailFilterChange(e)}
                    value="FAIL"
                    label={t('hide_tests.failing')}
                />
            </StyledDiv>
        </div>
    );
};

export default LastRunCheckbox;
