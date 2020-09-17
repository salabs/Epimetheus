// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../contexts/state';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

import {
    StyledDirectionButton,
    LatestButton,
    FlexDiv,
    StyledEndLeft,
} from './OffSetButtons.styles';

import { Header, ButtonContainer } from './LastRunCheckbox.styles';
import Left from '../../images/chevron-left.svg';
import Right from '../../images/chevron-right.svg';
const Offset = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const [
        {
            offset,
            historyDataState: { max_build_num },
        },
        dispatch,
    ] = useStateValue();
    const [inputOffset, setInputOffset] = useState(0);
    const [leftEnabled, setLeftEnabled] = useState(1);
    const [rightEnabled, setRightEnabled] = useState(1);

    const updateTags = tag => {
        queryParams.set('offset', tag);
        return queryParams.toString();
    };

    const handleRightButtonPress = e => {
        if (rightEnabled === 1) {
            const setOffset = parseInt(offset) + parseInt(inputOffset);
            dispatch({
                type: 'setOffset',
                offset: setOffset,
            });
            history.push({
                pathname: `${location.pathname}`,
                search: `?${updateTags(setOffset)}`,
                state: {},
            });
        }
    };

    const handleLeftButtonPress = e => {
        if (leftEnabled === 1) {
            const setOffset = parseInt(offset) - parseInt(inputOffset);
            dispatch({
                type: 'setOffset',
                offset: setOffset,
            });
            history.push({
                pathname: `${location.pathname}`,
                search: `?${updateTags(setOffset)}`,
                state: {},
            });
        }
    };

    useEffect(() => {
        const total_offset = queryParams.get('offset') || offset;
        dispatch({
            type: 'setOffset',
            offset: total_offset,
        });
        if (total_offset - inputOffset < 0) {
            setLeftEnabled(0);
        } else {
            setLeftEnabled(1);
        }
        if (max_build_num - inputOffset <= 0) {
            setRightEnabled(0);
        } else {
            setRightEnabled(1);
        }
    }, [offset, inputOffset, max_build_num]);

    // eslint-disable-next-line no-unused-vars
    const handleLatestButtonPress = e => {
        dispatch({
            type: 'setOffset',
            offset: 0,
        });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(0)}`,
            state: {},
        });
    };

    const handleNumberInput = e => {
        setInputOffset(e.target.value);
    };
    return (
        <ButtonContainer>
            <Header>Offset</Header>
            <FlexDiv id="offset_container">
                <LatestButton
                    onClick={handleLatestButtonPress}
                    id="latest_offset_button"
                >
                    <StyledEndLeft /> LATEST
                </LatestButton>
                <StyledDirectionButton
                    onClick={handleLeftButtonPress}
                    enabled={leftEnabled}
                    id="left_offset_button"
                    className={`left${leftEnabled}`}
                >
                    <img src={Left} alt="<" />
                </StyledDirectionButton>
                <input
                    type="number"
                    onChange={handleNumberInput}
                    value={inputOffset}
                    id="offset_field"
                />
                <StyledDirectionButton
                    onClick={handleRightButtonPress}
                    enabled={rightEnabled}
                    id="right_offset_button"
                    className={`right${rightEnabled}`}
                >
                    <img src={Right} alt=">" />
                </StyledDirectionButton>
            </FlexDiv>
        </ButtonContainer>
    );
};

export default Offset;
