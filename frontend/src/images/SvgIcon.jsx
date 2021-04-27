import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { colorTypes } from '../utils/colorTypes';

const SvgIcon = ({ svg, width, height, viewBox, id }) => {
    const uniqueId = uuidv4();
    const svgMap = new Map();

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
            fill: '#7B756F',
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
            fill: colorTypes['evidence grey'],
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
                    <path d={svgMap.get(svg).d2} fill={svgMap.get(svg).fill} />
                )}
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={svgMap.get(svg).d}
                    fill={svgMap.get(svg).fill}
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

export default SvgIcon;
