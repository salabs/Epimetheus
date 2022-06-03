import React, { useMemo, useState } from 'react';
import sift from 'sift';
import { useTranslation } from 'react-i18next';
import Checkbox from '../checkbox/Checkbox';
import { ContainerGrid12, ContentGrid6 } from '../../styles/baseComponents';
import { Header, StyledDiv } from '../testFilters/LastRunCheckbox.styles';
import { ToolWrapper, GroupContainer, SearchInput } from './SearchBy.styles';

const SearchBy = ({ dataset, searchBy, children, filterBy, translation }) => {
    const [searchTerm, setSearchTerm] = useState();
    const [pass, setPass] = useState(false);
    const [fail, setFail] = useState(false);

    const [t] = useTranslation(['buttons']);

    const { filter, direction } = filterBy;

    const searchFn = useMemo(() => {
        if (searchBy) {
            return sift({
                $or: searchBy.map(key => ({
                    [key]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
    }, [searchBy, searchTerm]);

    const subset = useMemo(() => {
        const data = searchFn ? dataset.filter(searchFn) : dataset;

        if (pass) {
            return data.filter(d => d.last_status !== 'PASS');
        }
        if (fail) {
            return dataset.filter(d => d.last_status !== 'FAIL');
        }
        return data;
    }, [dataset, searchFn, pass, fail]);

    const handleChange = value => {
        return value === 'PASS'
            ? (setPass(!pass), setFail(false))
            : (setFail(!fail), setPass(false));
    };

    return (
        <>
            <ContainerGrid12>
                <ContentGrid6>
                    <ToolWrapper>
                        {searchBy && (
                            <GroupContainer>
                                <Header>
                                    {t('search.header', {
                                        subject: translation,
                                    })}
                                </Header>
                                <div>
                                    <SearchInput
                                        name="searchTerm"
                                        onChange={e =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </GroupContainer>
                        )}
                        {filter && (
                            <GroupContainer>
                                <Header>
                                    {t('buttons.header', {
                                        subject: translation,
                                    })}
                                </Header>
                                <StyledDiv direction={direction}>
                                    <Checkbox
                                        label={t('buttons.passing')}
                                        value="PASS"
                                        checked={pass}
                                        onChange={e =>
                                            handleChange(e.target.value)
                                        }
                                    />
                                    <Checkbox
                                        label={t('buttons.failing')}
                                        value="FAIL"
                                        checked={fail}
                                        onChange={e =>
                                            handleChange(e.target.value)
                                        }
                                    />
                                </StyledDiv>
                            </GroupContainer>
                        )}
                    </ToolWrapper>
                </ContentGrid6>
            </ContainerGrid12>
            {children(subset)}
        </>
    );
};

export default SearchBy;
