import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { colorTypes } from '../utils/colorTypes';

const SvgIcon = ({ svg, width, height, viewBox, id, fill }) => {
    const uniqueId = uuidv4();
    const svgMap = new Map();

    // a back-up in case the 'svg' parameter is not given
    if (!svg) {
        svg = 'default';
    }

    svgMap
        .set('caret-down', {
            d:
                'M5.247 7.14L.45 1.658C-.115 1.013.345 0 1.204 0h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0v.001z',
            fill: colorTypes['evidence grey'],
            width: 12,
            height: 8,
        })
        .set('caret-up', {
            d:
                'M5.247.86L.45 6.341C-.115 6.988.345 8 1.204 8h9.592a1 1 0 00.753-1.659L6.753.861a1 1 0 00-1.506 0V.86z',
            fill: colorTypes['evidence grey'],
            width: 12,
            height: 8,
        })
        .set('checked', {
            d:
                'M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm10.03 4.97a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05h-.001z',
            fill: colorTypes['pirlo blue'],
            width: 16,
            height: 16,
        })
        .set('chevron-down', {
            d:
                'M.136.647a.461.461 0 01.15-.109.43.43 0 01.503.109L6 6.292 11.211.647a.461.461 0 01.15-.109.432.432 0 01.504.109.537.537 0 010 .708L6.327 7.353a.46.46 0 01-.15.109.43.43 0 01-.504-.109L.136 1.355A.505.505 0 010 1 .536.536 0 01.136.647z',
            fill: colorTypes['evidence grey'],
            width: 12,
            height: 8,
        })
        .set('chevron-down-white', {
            d:
                'M.136.647a.461.461 0 01.15-.109.43.43 0 01.503.109L6 6.292 11.211.647a.461.461 0 01.15-.109.432.432 0 01.504.109.537.537 0 010 .708L6.327 7.353a.46.46 0 01-.15.109.43.43 0 01-.504-.109L.136 1.355A.505.505 0 010 1 .536.536 0 01.136.647z',
            fill: colorTypes['nero white'],
            width: 12,
            height: 8,
        })
        .set('chevron-left', {
            d:
                'M7.354.646a.5.5 0 010 .708L1.707 7l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z',
            fill: colorTypes['evidence grey'],
            width: 8,
            height: 14,
        })
        .set('chevron-right', {
            d:
                'M.646.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L6.293 7 .646 1.354a.5.5 0 010-.708z',
            fill: colorTypes['evidence grey'],
            width: 8,
            height: 14,
        })
        .set('chevron-up', {
            d:
                'M11.864 7.353a.46.46 0 01-.15.109.431.431 0 01-.503-.109L6 1.708.789 7.353a.461.461 0 01-.15.109.432.432 0 01-.504-.109A.505.505 0 010 7a.537.537 0 01.135-.354L5.673.647a.461.461 0 01.15-.109.43.43 0 01.504.109l5.537 5.998A.505.505 0 0112 7a.538.538 0 01-.136.354z',
            fill: colorTypes['evidence grey'],
            width: 12,
            height: 8,
        })
        .set('chevron-up-white', {
            d:
                'M11.864 7.353a.46.46 0 01-.15.109.431.431 0 01-.503-.109L6 1.708.789 7.353a.461.461 0 01-.15.109.432.432 0 01-.504-.109A.505.505 0 010 7a.537.537 0 01.135-.354L5.673.647a.461.461 0 01.15-.109.43.43 0 01.504.109l5.537 5.998A.505.505 0 0112 7a.538.538 0 01-.136.354z',
            fill: colorTypes['nero white'],
            width: 12,
            height: 8,
        })
        .set('chevron-verticalbar-left', {
            d:
                'M8.854 3.646a.5.5 0 010 .708L5.207 8l3.647 3.646a.5.5 0 11-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0zM1.5 1a.5.5 0 00-.5.5v13a.5.5 0 001 0v-13a.5.5 0 00-.5-.5z',
            fill: colorTypes['evidence grey'],
            stroke: colorTypes['evidence grey'],
            strokeWidth: 0.5,
            width: 10,
            height: 16,
        })
        .set('collection-closed', {
            d:
                'M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z',
            fill: colorTypes['titan green'],
            width: 16,
            height: 16,
        })
        .set('collection-open', {
            d:
                'M0 9a1.5 1.5 0 001.5 1.5h13A1.5 1.5 0 0016 9V2A1.5 1.5 0 0014.5.5h-13A1.5 1.5 0 000 2v7z',
            fill: colorTypes['titan green'],
            width: 16,
            height: 11,
        })
        .set('collection-white', {
            d:
                'M3 4.5a.75.75 0 00.75.75h16.5a.75.75 0 100-1.5H3.75A.75.75 0 003 4.5zm3-3a.75.75 0 00.75.75h10.5a.75.75 0 100-1.5H6.75A.75.75 0 006 1.5z',
            d2:
                'M0 19.5a2.25 2.25 0 002.25 2.25h19.5A2.25 2.25 0 0024 19.5V9a2.25 2.25 0 00-2.25-2.25H2.25A2.25 2.25 0 000 9v10.5z',
            fill: colorTypes['nero white'],
            width: 24,
            height: 24,
        })
        .set('default', {
            d:
                'M16 8A8 8 0 11-.001 8 8 8 0 0116 8zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 00-.708.708L7.293 8l-3.147 3.146a.5.5 0 10.708.708L8 8.707l3.146 3.147a.5.5 0 10.708-.708L8.707 8l3.147-3.146z',
            fill: colorTypes['evidence grey'],
            width: 16,
            height: 16,
        })
        .set('external', {
            d:
                'M8.636 3.5C8.636 3.36739 8.58332 3.24021 8.48955 3.14645C8.39579 3.05268 8.26861 3 8.136 3H1.5C1.10218 3 0.720644 3.15804 0.43934 3.43934C0.158035 3.72064 0 4.10218 0 4.5L0 14.5C0 14.8978 0.158035 15.2794 0.43934 15.5607C0.720644 15.842 1.10218 16 1.5 16H11.5C11.8978 16 12.2794 15.842 12.5607 15.5607C12.842 15.2794 13 14.8978 13 14.5V7.864C13 7.73139 12.9473 7.60421 12.8536 7.51045C12.7598 7.41668 12.6326 7.364 12.5 7.364C12.3674 7.364 12.2402 7.41668 12.1464 7.51045C12.0527 7.60421 12 7.73139 12 7.864V14.5C12 14.6326 11.9473 14.7598 11.8536 14.8536C11.7598 14.9473 11.6326 15 11.5 15H1.5C1.36739 15 1.24021 14.9473 1.14645 14.8536C1.05268 14.7598 1 14.6326 1 14.5V4.5C1 4.36739 1.05268 4.24021 1.14645 4.14645C1.24021 4.05268 1.36739 4 1.5 4H8.136C8.26861 4 8.39579 3.94732 8.48955 3.85355C8.58332 3.75979 8.636 3.63261 8.636 3.5Z',
            d2:
                'M16.0006 0.5C16.0006 0.367392 15.948 0.240215 15.8542 0.146447C15.7604 0.0526784 15.6332 0 15.5006 0L10.5006 0C10.368 0 10.2408 0.0526784 10.1471 0.146447C10.0533 0.240215 10.0006 0.367392 10.0006 0.5C10.0006 0.632608 10.0533 0.759785 10.1471 0.853553C10.2408 0.947322 10.368 1 10.5006 1H14.2936L6.14663 9.146C6.10014 9.19249 6.06327 9.24768 6.03811 9.30842C6.01295 9.36916 6 9.43426 6 9.5C6 9.56574 6.01295 9.63084 6.03811 9.69158C6.06327 9.75232 6.10014 9.80751 6.14663 9.854C6.19312 9.90049 6.24831 9.93736 6.30905 9.96252C6.36979 9.98768 6.43489 10.0006 6.50063 10.0006C6.56638 10.0006 6.63148 9.98768 6.69222 9.96252C6.75295 9.93736 6.80814 9.90049 6.85463 9.854L15.0006 1.707V5.5C15.0006 5.63261 15.0533 5.75979 15.1471 5.85355C15.2408 5.94732 15.368 6 15.5006 6C15.6332 6 15.7604 5.94732 15.8542 5.85355C15.948 5.75979 16.0006 5.63261 16.0006 5.5V0.5Z',
            fill: colorTypes['evidence grey'],
            width: 16,
            height: 16,
        })
        .set('fail', {
            d:
                'M9.065.435c-.58-.58-1.52-.58-2.1 0L.45 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.065.435zM8.015 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507a.905.905 0 00-.9-.995zm.002 6a1 1 0 100 2 1 1 0 000-2z',
            fill: colorTypes['nelson purple'],
            width: 16,
            height: 16,
        })
        .set('fail-white', {
            d:
                'M9.065.435c-.58-.58-1.52-.58-2.1 0L.45 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.065.435zM8.015 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507a.905.905 0 00-.9-.995zm.002 6a1 1 0 100 2 1 1 0 000-2z',
            fill: '#fff',
            width: 16,
            height: 16,
        })
        .set('indeterminate', {
            d:
                'M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 100 1h8a.5.5 0 000-1H4z',
            fill: colorTypes['pirlo blue'],
            width: 16,
            height: 16,
        })
        .set('not-found', {
            d: 'M5 7h6a1 1 0 110 2H5a1 1 0 010-2z',
            fill: colorTypes['pirlo blue'],
            width: 16,
            height: 16,
        })
        .set('skip', {
            d:
                'M6 5h4a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1z',
            fill: colorTypes['pirlo blue'],
            width: 16,
            height: 16,
        })
        .set('success', {
            d:
                'M10.97 4.97a.75.75 0 011.072 1.05L8.05 11.01a.75.75 0 01-1.08.02L4.325 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.238.238 0 01.02-.022h-.001z',
            fill: colorTypes['pirlo blue'],
            width: 16,
            height: 16,
        })
        .set('unchecked', {
            d:
                'M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z',
            fill: colorTypes['evidence grey'],
            width: 16,
            height: 16,
        });

    return (
        <svg
            width={width ? width : svgMap.get(svg).width}
            height={height ? height : svgMap.get(svg).height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${id ? id : uniqueId})`}>
                {svgMap.get(svg).d2 && (
                    <path
                        d={svgMap.get(svg).d2}
                        fill={fill ? colorTypes[fill] : svgMap.get(svg).fill}
                    />
                )}
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={svgMap.get(svg).d}
                    fill={fill ? colorTypes[fill] : svgMap.get(svg).fill}
                    stroke={svgMap.get(svg).stroke}
                    strokeWidth={svgMap.get(svg).strokeWidth}
                />
            </g>
            <defs>
                <clipPath id={id ? id : uniqueId}>
                    <path
                        fill={colorTypes['nero white']}
                        d={
                            svg === 'collection-white'
                                ? 'M0 0h24v24H0z'
                                : 'M0 0h16v16H0z'
                        }
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

SvgIcon.propTypes = {
    svg: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    viewBox: PropTypes.string,
    id: PropTypes.string,
    fill: PropTypes.oneOf(['nero white', 'titan green']),
};

export default SvgIcon;
