// eslint-disable-next-line
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStateValue } from '../../contexts/state';
import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import {
    Header,
    StyledDiv,
    StyledLabel,
    StyledInput,
} from './LastRunCheckbox.styles';

import { useQueryParams } from '../../hooks/useQuery';
import { useHistory, useLocation } from 'react-router-dom';

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
            <StyledDiv direction={direction} id="last-run-checkbox-container">
                <StyledLabel labelfor="filterPassed">
                    <StyledInput
                        type="checkbox"
                        name="filterPassed"
                        value="PASS"
                        className={`pass${passFilter}`}
                        checked={passFilter}
                        onChange={e => handlePassFilterChange(e)}
                    />
                    <span>{passFilter ? <Checked /> : <Unchecked />}</span>
                    {t('hide_tests.passing')}
                </StyledLabel>
                <StyledLabel labelfor="filterFailed">
                    <StyledInput
                        type="checkbox"
                        name="filterFailed"
                        value="FAIL"
                        checked={failFilter}
                        className={`fail${failFilter}`}
                        onChange={e => handleFailFilterChange(e)}
                    />
                    <span>{failFilter ? <Checked /> : <Unchecked />}</span>
                    {t('hide_tests.failing')}
                </StyledLabel>
            </StyledDiv>
        </div>
    );
};

export default LastRunCheckbox;
