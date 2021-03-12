// Not used anywhere!

// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../contexts/state';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px 40px 20px 0px;
    width: 50%;
    min-width: 250px;
`;

const Input = styled.input`
    width: 200px;
    padding: 10px 10px;
    margin: 0;
    border: 1px solid var(--gradient-black);
    border-radius: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-size: 1.2em auto, 100%;
    background-color: var(--nero-white);
`;

const SuggestionContainer = styled.div`
    margin-left: 20px;
    margin-top: 0px;
    border: 1px solid var(--gradient-black);
    border-top: 0;
    border-bottom: 1;
    background-color: var(--nero-white);
    width: 200px;
    max-height: 300px;
    overflow: auto;
    overflow-x: hidden;
    z-index: 2;
    position: absolute;
    font-size: 14px;
    div {
        padding: 5px 10px;
    }
`;

const SuggestionError = styled.div`
    padding-left: 0px;
    padding-top: 5px;
    position: absolute;
    font-size: 75%;
    color: var(--semolina-red);
    display: none;
    font-weight: bold;
    &.show {
        display: block;
    }
`;

const SuggestionItem = styled.div`
    margin-top: 0;
    border: 0;
    border-top: 0;
    background-color: var(--nero-white);
    width: 200px;
    padding-left: 20px;
`;

const ActiveSuggestionItem = styled(SuggestionItem)`
    background-color: var(--pirlo-blue-darker);
    border: 0px solid blue;
    color: white;
    cursor: pointer;
`;
const BranchFilter = () => {
    // Global states from reducer
    const [
        {
            branchesState,
            selectedBranchState,
            amountOfBuilds,
            selectedBuildState,
        },
        dispatch,
    ] = useStateValue();
    const options = branchesState;
    const selectedBuild = selectedBuildState.id;
    const history = useHistory();

    // Local component states
    const [suggestions, setSuggestions] = useState([]);
    const [activeOption, setActiveOption] = useState(-1);
    const [userInput, setUserInput] = useState('');
    const [visible, setVisible] = useState(false);
    const [suggestionError, setSuggestionError] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const fetchData = async (builds, series_id, build_id) => {
        dispatch({ type: 'setLoadingState', loadingState: true });
        try {
            const url = '/history/' + series_id + '/' + builds + '/';
            history.push(url);
            dispatch({ type: 'setLoadingState', loadingState: false });
            //dispatch({ type: 'updateHistory', historyData: json });
        } catch (error) {
            //
        }
    };

    const handleFilterChange = e => {
        const input = e.target.value;
        if (input.length === 0) {
            emptySearchField();
            setSuggestionError(false);
        } else {
            setUserInput(input);
            if (options.series) {
                const filteredList = options.series.filter(({ name }) =>
                    name.toLowerCase().startsWith(input.toLowerCase())
                );
                setSuggestions(filteredList);
                setVisible(filteredList.length > 0);
                setSuggestionError(!(filteredList.length > 0));
            }
        }
    };

    const handleClick = e => {
        const clickedBranchName = e.target.getAttribute('name');
        const branchAndTeam = e.target.innerText;
        try {
            const branch = options.series.find(
                ({ name }) => name === clickedBranchName
            );
            dispatch({
                type: 'setSelectedBranch',
                name: branchAndTeam,
                id: branch.id,
            });
            fetchData(amountOfBuilds, branch.id, selectedBuild);
        } catch (error) {
            // console.log('clicked branch not found')
        }
        emptySearchField();
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (
                activeOption >= 0 &&
                userInput !== '' &&
                document.getElementById(activeOption)
            ) {
                const branchNameAndTeam = document.getElementById(activeOption)
                    .innerText;
                const branchId = document
                    .getElementById(activeOption)
                    .getAttribute('tabIndex');
                dispatch({
                    type: 'setSelectedBranch',
                    name: branchNameAndTeam,
                    id: branchId,
                });
                fetchData(amountOfBuilds, branchId, selectedBuild);
                emptySearchField();
            }
        } else if (e.key === 'ArrowDown' || e.key === 'Down') {
            if (
                Number(activeOption) + 1 !== suggestions.length &&
                suggestions.length > 0
            ) {
                setActiveOption(Number(activeOption) + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'Up') {
            if (Number(activeOption) >= 0) {
                setActiveOption(Number(activeOption) - 1);
            }
        } else {
            const input = e.target.value + e.key;
            if (options.series) {
                const filteredList = options.series.filter(({ name }) =>
                    name.toLowerCase().startsWith(input.toLowerCase())
                );

                if (filteredList.length === 1) {
                    setActiveOption(0);
                }
            }
        }
    };

    const emptySearchField = () => {
        setSuggestions([]);
        setActiveOption(-1);
        setUserInput('');
        setVisible(false);
    };

    const handleSuggestionItemHover = e => setActiveOption(Number(e.target.id));

    const handleFocusChange = e =>
        setVisible(
            (e.type === 'focus' || e.type === 'mousedown') &&
                suggestions.length > 0
        );

    return (
        <Container id="branch-filter-container">
            <h2 id="branch-heading">
                Series / Branch: {selectedBranchState.name}
            </h2>
            <form autoComplete="off" action="#" className="search-form">
                <div className="autocomplete">
                    <label htmlFor="search-branch" className="sr-show">
                        Series / Branch
                    </label>
                    <Input
                        id="search-branch-field"
                        type="text"
                        name="search-branch"
                        placeholder="Series / Branch"
                        onChange={e => handleFilterChange(e)}
                        onKeyDown={e => handleKeyDown(e)}
                        onBlur={e => handleFocusChange(e)}
                        onFocus={e => handleFocusChange(e)}
                        onMouseDown={e => handleFocusChange(e)}
                        value={userInput}
                    />
                    <SuggestionContainer
                        className="suggestion-container"
                        id="suggestions"
                        style={{ display: visible ? 'block' : 'none' }}
                        aria-live="polite"
                    >
                        {suggestions &&
                            suggestions.map(({ id, name, team }, index) => {
                                if (index === activeOption) {
                                    return (
                                        <ActiveSuggestionItem
                                            role="button"
                                            tabIndex={id}
                                            className={`suggestion - item`}
                                            name={name}
                                            id={index}
                                            key={id}
                                            onMouseDown={e => handleClick(e)}
                                            onMouseEnter={e =>
                                                handleSuggestionItemHover(e)
                                            }
                                            onMouseLeave={e =>
                                                handleSuggestionItemHover(e)
                                            }
                                            onKeyDown={() => handleKeyDown()}
                                        >
                                            {name} - {team}
                                        </ActiveSuggestionItem>
                                    );
                                } else {
                                    return (
                                        <SuggestionItem
                                            role="button"
                                            tabIndex={id}
                                            className={`suggestion - item`}
                                            name={name}
                                            id={index}
                                            key={id}
                                            onMouseDown={e => handleClick(e)}
                                            onMouseEnter={e =>
                                                handleSuggestionItemHover(e)
                                            }
                                            onMouseLeave={e =>
                                                handleSuggestionItemHover(e)
                                            }
                                            onKeyDown={() => handleKeyDown()}
                                        >
                                            {name} - {team}
                                        </SuggestionItem>
                                    );
                                }
                            })}
                    </SuggestionContainer>
                    <SuggestionError
                        className="suggestions-error"
                        style={{ display: suggestionError ? 'block' : 'none' }}
                    >
                        No branches matching text found
                    </SuggestionError>
                </div>
            </form>
        </Container>
    );
};

export default BranchFilter;
