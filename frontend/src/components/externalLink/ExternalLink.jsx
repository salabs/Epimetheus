import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../../images/SvgIcon';
import { LinkContainer } from './ExternalLink.styles';

// If color is not given, it defaults to link's default color titan green

const ExternalLink = ({ url, label, color }) => {
    return (
        <LinkContainer
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label + ' (external link)'}
        >
            {label}
            <SvgIcon svg="external" fill={color ? color : 'titan green'} />
        </LinkContainer>
    );
};

ExternalLink.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['nero white', 'titan green']),
};

export default ExternalLink;
