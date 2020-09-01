import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'ramda';
import { capitalCaseInitial, removeUnderscore } from '../../utils/helpers';
import {
    Container,
    ParagraphContainer,
    StatusSpan,
} from './ParentTable.styles';

const ParentTable = props => {
    const { data, types } = props;

    const cleansedData = data && pick(types, data);

    const showData = () => {
        return Object.entries(cleansedData).map(([key, value]) => {
            const cleanedHeader = removeUnderscore(capitalCaseInitial(key));

            return (
                <ParagraphContainer key={key}>
                    <span>{cleanedHeader}&#58;</span>
                    {key.includes('status') ? (
                        <StatusSpan status={value}>{value}</StatusSpan>
                    ) : (
                        <span>{value}</span>
                    )}
                </ParagraphContainer>
            );
        });
    };

    return (
        <React.Fragment>
            {data && <Container id="lastRunInfo">{showData()}</Container>}
        </React.Fragment>
    );
};

ParentTable.propTypes = {
    data: PropTypes.object,
    types: PropTypes.array.isRequired,
};

export default ParentTable;
