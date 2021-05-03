import React from 'react';
import { ScrollButton } from './ScrollTableButton.styles';
import SvgIcon from '../../images/SvgIcon';

const ScrollTableButton = props => {
    const { canScrollLeft, canScrollRight } = props;

    return (
        <>
            <ScrollButton
                className="left"
                onClick={() => props.moveLeft()}
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
                onClick={() => props.moveRight()}
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

export default ScrollTableButton;
