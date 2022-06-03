import React from 'react';
import PropTypes from 'prop-types';
import { ScrollButton } from './ScrollTableButton.styles';
import SvgIcon from '../../images/SvgIcon';

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
                <SvgIcon
                    svg="chevron-left"
                    width={18}
                    height={30}
                    viewBox="0 0 9 16"
                />
                <p className="sr-show">{'<'}</p>
            </ScrollButton>

            <ScrollButton
                className="right"
                onClick={() => moveRight()}
                disabled={!canScrollRight}
            >
                <SvgIcon
                    svg="chevron-right"
                    width={18}
                    height={30}
                    viewBox="0 0 9 16"
                />
                <p className="sr-show">{'>'}</p>
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
