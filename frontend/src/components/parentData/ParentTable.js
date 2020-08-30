import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'ramda';
import styled from 'styled-components';

const Container = styled.div`
    background: var(--hermanni-grey);
    padding: 40px 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    div {
        display: flex;
        padding: 0 10px;

        span:first-child {
            padding-right: 10px;
            font-weight: bolder;
        }
    }
`;

const StatusSpan = styled.span`
    color: ${props =>
        props.status === 'PASS' ? 'var(--pirlo-blue)' : 'var(--nelson-purple)'};
`;

const ParentTable = props => {
    const { data, types } = props;

    const cleansedData = data && pick(types, data);

    const showData = () => {
        return Object.entries(cleansedData).map(([key, value]) => {
            const capitalCaseInitial =
                key.charAt(0).toUpperCase() + key.slice(1);

            const cleanedHeader = capitalCaseInitial.replace(/_/g, ' ');

            return (
                <div key={key}>
                    <span>{cleanedHeader}&#58;</span>
                    {key.includes('status') ? (
                        <StatusSpan status={value}>{value}</StatusSpan>
                    ) : (
                        <span>{value}</span>
                    )}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            {data && <Container>{showData()}</Container>}
        </React.Fragment>
    );
};

ParentTable.propTypes = {
    data: PropTypes.object,
    types: PropTypes.array.isRequired,
};

export default ParentTable;
