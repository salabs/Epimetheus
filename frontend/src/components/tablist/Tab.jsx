import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabLink } from './Tab.styles';
import { ContainerGrid12, ContentGrid6 } from '../../styles/baseComponents';

const Tab = ({ tabLinks }) => {
    const tabLinkItems = tabLinks.map(element => {
        return (
            <TabLink to={element.to} key={element.to} role="tab">
                {element.translation}
            </TabLink>
        );
    });

    return (
        <Tabs role="tablist">
            <ContainerGrid12>
                <ContentGrid6>{tabLinkItems}</ContentGrid6>
            </ContainerGrid12>
        </Tabs>
    );
};

Tab.propTypes = {
    tabLinks: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string.isRequired,
            translation: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Tab;
