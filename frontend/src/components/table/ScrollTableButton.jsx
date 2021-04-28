import React from 'react';
import PropTypes from 'prop-types';
import { ScrollButton } from './ScrollTableButton.styles';
import ChevronRight from '../../images/chevron-right.svg';
import ChevronLeft from '../../images/chevron-left.svg';

const ScrollTableButton = ({
    canScrollLeft,
    canScrollRight,
    moveLeft,
    moveRight,
}) => {
    return (
        <>
            <ScrollButton
                className="left"
                onClick={() => moveLeft()}
                disabled={!canScrollLeft}
            >
                <img src={ChevronLeft} alt="<" />
            </ScrollButton>

            <ScrollButton
                className="right"
                onClick={() => moveRight()}
                disabled={!canScrollRight}
            >
                <img src={ChevronRight} alt=">" />
            </ScrollButton>
        </>
    );
};

ScrollTableButton.propTypes = {
    canScrollLeft: PropTypes.bool.isRequired,
    canScrollRight: PropTypes.bool.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired,
};

export default ScrollTableButton;
