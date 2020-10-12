/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../contexts/state';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

import {
    Header,
    StyledInput,
    StyledDirectionButton,
    LatestButton,
    FlexDiv,
    StyledEndLeft,
} from './OffSetButtons.styles';

import { ButtonContainer } from './LastRunCheckbox.styles';
import Left from '../../images/chevron-left.svg';
import Right from '../../images/chevron-right.svg';
const Offset = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const [
        {
            offset,
            parentData: { seriesData },
        },
        dispatch,
    ] = useStateValue();
    const [inputOffset, setInputOffset] = useState(0);
    const [leftDisabled, setleftDisabled] = useState(false);
    const [rightDisabled, setrightDisabled] = useState(false);

    const { builds } = seriesData;

    const updateTags = tag => {
        queryParams.set('offset', tag);
        return queryParams.toString();
    };

    const buttonClickDispatch = para_offset => {
        dispatch({
            type: 'setOffset',
            offset: para_offset,
        });
        history.push({
            pathname: `${location.pathname}`,
            search: `?${updateTags(para_offset)}`,
            state: {},
        });
    };

    const handleDirectionButtonPress = direction => {
        if (direction === 'right' && !rightDisabled) {
            const setOffset = parseInt(offset) + parseInt(inputOffset);
            buttonClickDispatch(setOffset);
        } else if (direction === 'left' && !leftDisabled) {
            const setOffset = parseInt(offset) - parseInt(inputOffset);
            buttonClickDispatch(setOffset);
        }
    };

    useEffect(() => {
        const paramsOffset = queryParams.get('offset') || parseInt(offset);
        const totalOffset = parseInt(paramsOffset) + parseInt(inputOffset);
        if (paramsOffset - inputOffset < 0) {
            setleftDisabled(true);
        } else {
            setleftDisabled(false);
        }
        if (builds - totalOffset - 1 < 0) {
            setrightDisabled(true);
        } else {
            setrightDisabled(false);
        }
    }, [offset, inputOffset, builds]);

    const handleLatestButtonPress = () => {
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
        const value = parseInt(e.target.value) < 0 ? 0 : e.target.value;
        setInputOffset(value);
    };

    return (
        <ButtonContainer>
            <Header>Offset</Header>
            <FlexDiv id="offset_container">
                <LatestButton
                    onClick={handleLatestButtonPress}
                    id="latest_offset_button"
                >
                    <StyledEndLeft /> <span>LATEST</span>
                </LatestButton>
                <StyledDirectionButton
                    onClick={() => handleDirectionButtonPress('left')}
                    disabled={leftDisabled}
                    id="left_offset_button"
                    className={`left${leftDisabled}`}
                >
                    <img src={Left} alt="<" />
                </StyledDirectionButton>
                <StyledInput
                    type="number"
                    onChange={handleNumberInput}
                    value={inputOffset}
                    id="offset_field"
                />
                <StyledDirectionButton
                    onClick={() => handleDirectionButtonPress('right')}
                    disabled={rightDisabled}
                    id="right_offset_button"
                    className={`right${rightDisabled}`}
                >
                    <img src={Right} alt=">" />
                </StyledDirectionButton>
            </FlexDiv>
        </ButtonContainer>
    );
};

export default Offset;
