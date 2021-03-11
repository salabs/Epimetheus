import React from 'react';
import { ScrollButton } from './ScrollTableButton.styles';
import ChevronRight from '../../images/chevron-right.svg';
import ChevronLeft from '../../images/chevron-left.svg';

const ScrollTableButton = props => {
    const canScrollLeft = props['can-scroll-left'];
    const canScrollRight = props['can-scroll-right'];

    return (
        <>
            <ScrollButton
                className="left"
                onClick={() => props.moveLeft()}
                disabled={!canScrollLeft}
            >
                <img src={ChevronLeft} alt=">" />
            </ScrollButton>

            <ScrollButton
                className="right"
                onClick={() => props.moveRight()}
                disabled={!canScrollRight}
            >
                <img src={ChevronRight} alt=">" />
            </ScrollButton>
        </>
    );
};

export default ScrollTableButton;
