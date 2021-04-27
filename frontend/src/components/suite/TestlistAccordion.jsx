import React, { useState } from 'react';
import { useParams } from 'react-router';
import { pickIcon } from '../../utils/TestIcon';
import {
    FlexContainer,
    HeaderContainer,
    TestListContainer,
    DotSpan,
    TestStatusRow,
    StyledLink,
    SvgStatus,
    TimeContainer,
    TagContainer,
} from './TestlistAccordion.styles';
import AttributeTag from '../attributeTag/AttributeTag';
import SvgIcon from '../../images/SvgIcon';
import { v4 as uuidv4 } from 'uuid';

const TestlistAccordion = ({ suite }) => {
    const { suiteId, buildId, seriesId, testId } = useParams();
    const [Open, setOpen] = useState(true);
    const id = uuidv4();

    return (
        <FlexContainer>
            <HeaderContainer
                onClick={() => setOpen(!Open)}
                aria-expanded={Open}
                aria-controls={id}
            >
                <SvgIcon svg="collection-white" />
                <h2>{suite.name} Tests</h2>
                <p>
                    {suite.tests.length} test
                    {suite.tests.length > 1 && 's'}
                </p>
                {Open ? (
                    <SvgIcon svg="chevron-up-white" />
                ) : (
                    <SvgIcon svg="chevron-down-white" />
                )}
            </HeaderContainer>
            <TestListContainer className={Open ? 'open' : 'close'} id={id}>
                <ul>
                    {' '}
                    {suite.tests.map((test, i) => {
                        return (
                            <li key={i}>
                                <DotSpan
                                    isselected={test.id.toString() === testId}
                                />
                                <TestStatusRow>
                                    {' '}
                                    <StyledLink
                                        isselected={
                                            test.id.toString() === testId
                                        }
                                        to={`/series/${seriesId}/build/${buildId}/suite/${suiteId}/test/${test.id}/history`}
                                    >
                                        {test.name}
                                    </StyledLink>
                                    <SvgStatus>
                                        {pickIcon(test.status)}
                                    </SvgStatus>
                                    <TimeContainer>
                                        {(test.elapsed / 1000).toFixed(2)}s
                                    </TimeContainer>
                                    <TagContainer>
                                        {' '}
                                        {test.tags.map((tag, i) => {
                                            return (
                                                <AttributeTag
                                                    key={i}
                                                    color="grey"
                                                    header={tag}
                                                />
                                            );
                                        })}
                                    </TagContainer>
                                </TestStatusRow>
                            </li>
                        );
                    })}
                </ul>
            </TestListContainer>
        </FlexContainer>
    );
};

export default TestlistAccordion;
