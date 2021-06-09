/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQuery';
import SvgIcon from '../../images/SvgIcon';
import { StyledInput, FlexDiv, Heading } from './OffSetButtons.styles';
import { DefaultButton } from '../../styles/button.styles';
import { StateContext } from '../../contexts/state';

const OffsetButtons = () => {
    const history = useHistory();
    const location = useLocation();
    const queryParams = useQueryParams();

    const { state, dispatch } = useContext(StateContext);
    const {
        offset,
        parentData: { seriesData },
    } = state;

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
            <FlexDiv id="offset_container">
                <DefaultButton
                    onClick={handleLatestButtonPress}
                    id="latest_offset_button"
                >
                    <SvgIcon svg="chevron-verticalbar-left" />{' '}
                    <span>LATEST</span>
                </DefaultButton>
                <DefaultButton
                    onClick={() => handleDirectionButtonPress('left')}
                    disabled={leftDisabled}
                    id="left_offset_button"
                    aria-label="<"
                    className={`left${leftDisabled}`}
                >
                    <SvgIcon svg="chevron-left" />
                    <p className="sr-show">{'<'}</p>
                </DefaultButton>
                <StyledInput
                    type="number"
                    onChange={handleNumberInput}
                    value={inputOffset}
                    id="offset_field"
                />
                <DefaultButton
                    onClick={() => handleDirectionButtonPress('right')}
                    disabled={rightDisabled}
                    id="right_offset_button"
                    aria-label=">"
                    className={`right${rightDisabled}`}
                >
                    <SvgIcon svg="chevron-right" />
                    <p className="sr-show">{'>'}</p>
                </DefaultButton>
            </FlexDiv>
        </div>
    );
};

export default OffsetButtons;
