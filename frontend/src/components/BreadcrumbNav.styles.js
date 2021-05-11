import styled from 'styled-components';
import React from 'react';
export const BreadcrumbList = styled(props => <ol {...props} />).attrs(
    ({ customProperty }) => ({
        customProperty,
    })
)`
    font-size: 14px;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    list-style-type: none;
    padding: var(--space-40) 0 0 0;
    margin-left: -3px; // balance out the first li > a's margin-left

    li {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        line-height: var(--space-16);

        &::after {
            content: '';
            position: absolute;
            top: 5px;
            left: 0;
            display: inline-block;
            width: 5px;
            height: 13px;
            border-right: 2px solid var(--tonic-grey);
            transform: rotate(26deg);
        }

        &:first-of-type {
            &::after {
                content: none;
            }

            a {
                margin-left: 3px; // without this the focus styles are cropped
                width: calc(100% - 6px);
            }
        }

        a {
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            width: calc(100% - 19px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin: var(--space-4) var(--space-8) var(--space-4) var(--space-16);
            vertical-align: top;

            &:hover {
                text-decoration: underline;
                color: var(--titan-green-darker);
                background: var(--hermanni-grey-lighter);
            }

            &.active {
                color: var(--pirlo-blue);

                &:hover {
                    color: var(--pirlo-blue-darker);
                }
            }
        }
    }
`;
