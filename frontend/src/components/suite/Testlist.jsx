import React, { useState } from 'react';
import { useParams } from 'react-router';
import { pickIcon } from '../TestIcon';
import {
    FlexContainer,
    HeaderContainer,
    SvgCollection,
    SvgDown,
    SvgUp,
    TestListContainer,
    DotSpan,
    TestStatusRow,
    StyledLink,
    SvgStatus,
    TimeContainer,
    TagContainer,
    Tag,
} from './Testlist.styles';

const Testlist = ({ suite }) => {
    const { suiteId, buildId, seriesId, testId } = useParams();
    const [Open, setOpen] = useState(true);

    return (
        <FlexContainer className="container">
            <HeaderContainer
                onClick={() => setOpen(!Open)}
                onKeyPress={() => setOpen(!Open)}
            >
                <SvgCollection />
                <h3>{suite.name} Tests</h3>
                <p>
                    {suite.tests.length} test
                    {suite.tests.length > 1 && 's'}
                </p>
                {Open ? <SvgUp></SvgUp> : <SvgDown></SvgDown>}
            </HeaderContainer>
            <TestListContainer className={Open ? 'Open' : 'Close'}>
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
                                            return <Tag key={i}>{tag}</Tag>;
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

export default Testlist;
