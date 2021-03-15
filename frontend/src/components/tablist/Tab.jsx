import React from 'react';
import { Tabs, TabLink } from './Tab.styles';
import { ContainerGrid12, ContentGrid6 } from '../../styles/baseComponents';

const Tab = props => {
    const { tabLinks } = props;

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

export default Tab;
