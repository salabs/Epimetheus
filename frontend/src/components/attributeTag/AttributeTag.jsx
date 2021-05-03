import React from 'react';
import PropTypes from 'prop-types';
import { AttributeTagContainer } from './AttributeTag.styles';

// Attribute tag has four color options: grey, yellow, blue and purple.
// If the attribute 'color' is not given, the tag's color will default to 'grey'.

const AttributeTag = ({ color, header }) => {
    return (
        <AttributeTagContainer className={color ? color : 'grey'}>
            {header}
        </AttributeTagContainer>
    );
};

AttributeTag.propTypes = {
    color: PropTypes.oneOf(['grey', 'yellow', 'blue', 'purple']),
    header: PropTypes.string.isRequired,
};

export default AttributeTag;
