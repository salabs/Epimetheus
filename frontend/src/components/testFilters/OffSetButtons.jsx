/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../contexts/state';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';

import { StyledInput, FlexDiv, Heading } from './OffSetButtons.styles';

import { DefaultButton } from '../../styles/button.styles';

import { ReactComponent as Left } from '../../images/chevron-left.svg';
import { ReactComponent as Right } from '../../images/chevron-right.svg';
import { ReactComponent as EndLeft } from '../../images/chevron-verticalbar-left.svg';

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
        const paramsOffset = queryParams.get('offset') || offset;
        const totalOffset = parseInt(paramsOffset) + parseInt(inputOffset);
        dispatch({
            type: 'setOffset',
            offset: paramsOffset,
        });
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

    useEffect(() => {
        return () => {
            dispatch({ type: 'flushQueryParams' });
        };
    }, []);

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
        <div>
            <Heading>Offset</Heading>
            <FlexDiv robot_id="offset_container" id="offset_container">
                <DefaultButton
                    onClick={handleLatestButtonPress}
                    robot_id="latest_offset_button"
                    id="latest_offset_button1"
                >
                    <EndLeft /> <span>LATEST</span>
                </DefaultButton>
                <DefaultButton
                    onClick={() => handleDirectionButtonPress('left')}
                    disabled={leftDisabled}
                    robot_id="left_offset_button"
                    id="left_offset_button"
                    aria-label="<"
                    className={`left${leftDisabled}`}
                >
                    <Left alt="<" />
                </DefaultButton>
                <StyledInput
                    type="number"
                    onChange={handleNumberInput}
                    value={inputOffset}
                    robot_id="offset_field"
                    id="offset_field"
                />
                <DefaultButton
                    onClick={() => handleDirectionButtonPress('right')}
                    disabled={rightDisabled}
                    robot_id="right_offset_button"
                    id="right_offset_button"
                    aria-label=">"
                    className={`right${rightDisabled}`}
                >
                    <Right src={Right} alt=">" />
                </DefaultButton>
            </FlexDiv>
        </div>
    );
};

export default Offset;
