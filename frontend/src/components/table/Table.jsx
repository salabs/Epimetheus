import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    OverflowWrapper,
    SimpleTable,
    SpreadSheetTable,
    TableWrapper,
} from './Table.styles';
import ScrollTableButton from './ScrollTableButton';

export const Table = ({ tableId, robot_id, simpleTable, children }) => {
    const ref = React.createRef();

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [windowSize, setWindowSize] = useState([0, 0]);
    const maxScrollLeft = React.useRef(0);

    // Checks if table is scrolled using other methods than scrollButtons (e.g. keyboard / mouse) ==> scrollPosition
    useEffect(() => {
        const savedRef = ref.current;

        function updateScrollPosition() {
            setScrollPosition(savedRef.scrollLeft);
        }

        savedRef.addEventListener('scroll', updateScrollPosition);
        updateScrollPosition();

        return () =>
            savedRef.removeEventListener('scroll', updateScrollPosition);
    }, [ref]);

    // Checks if window is resized ==> windowSize
    useEffect(() => {
        function updateWindowSize() {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();

        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    // Checks if table is scrollable and decides to which directions it's scrollable
    useEffect(() => {
        maxScrollLeft.current =
            ref.current.scrollWidth - ref.current.clientWidth;

        // check that table is scrollable and it has not been scrolled
        if (maxScrollLeft.current !== 0 && scrollPosition === 0) {
            setCanScrollRight(true);
            setCanScrollLeft(false);
        }

        // show scroll left and right button
        if (scrollPosition !== 0) {
            setCanScrollLeft(true);
            setCanScrollRight(true);
        }

        // hide scroll left button when there's nothing to scroll
        if (scrollPosition === 0) {
            setCanScrollLeft(false);
        }

        // hide scroll right button when there's nothing to scroll
        if (
            scrollPosition === maxScrollLeft.current ||
            scrollPosition === maxScrollLeft.current - 1
        ) {
            setCanScrollRight(false);
        }
    }, [ref, scrollPosition, windowSize]);

    function moveRight() {
        ref.current.scrollLeft += 150;
        setScrollPosition(scrollPosition + 150);
    }

    function moveLeft() {
        ref.current.scrollLeft -= 150;
        setScrollPosition(scrollPosition - 150);
    }

    return (
        <TableWrapper>
            <ScrollTableButton
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
                moveRight={() => moveRight()}
                moveLeft={() => moveLeft()}
            />
            <OverflowWrapper ref={ref}>
                {simpleTable ? (
                    <SimpleTable robot_id={robot_id} id={tableId}>
                        {children}
                    </SimpleTable>
                ) : (
                    <SpreadSheetTable robot_id={robot_id} id={tableId}>
                        {children}
                    </SpreadSheetTable>
                )}
            </OverflowWrapper>
        </TableWrapper>
    );
};

Table.propTypes = {
    tableId: PropTypes.string.isRequired,
    simpleTable: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
