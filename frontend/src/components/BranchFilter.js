// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useStateValue } from '../contexts/state';
import theme from '../styles/theme';

const BranchFilter = () => {
  const filterStyles = css`
    padding: 20px 40px 20px 0px;

    width: 50%;
    min-width: 250px;
    input {
      width: 200px;
      padding: 10px 10px;
      margin: 0;
      border: 1px solid #333;
      border-radius: 0;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-size: 1.2em auto, 100%;
      background-color: #fefefe;
    }
    .suggestion-container {
      margin-left: 20px;
      margin-top: 0px;
      border: 1px solid #000;
      border-top: 0;
      border-bottom: 1;
      background-color: #fafafa;
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
    }
    .suggestions-error {
      padding-left: 0px;
      padding-top: 5px;
      position: absolute;
      font-size: 75%;
      color: ${theme.colors.fail};
      display: none;
      font-weight: bold;
      &.show {
        display: block;
      }
    }
    .suggestion-item {
      margin-top: 0;
      border: 0;
      border-top: 0;
      background-color: #fafafa;
      width: 200px;
      padding-left: 20px;
    }
    .option-active {
      background-color: #0030bb;
      border: 0px solid blue;
      color: white;
      cursor: pointer;
    }
  `;

  // Global states from reducer
  const [
    { branchesState, selectedBranchState, amountOfBuilds, selectedBuildState },
    dispatch
  ] = useStateValue();
  const options = branchesState;
  const selectedBuild = selectedBuildState.id;

  // Local component states
  const [suggestions, setSuggestions] = useState([]);
  const [activeOption, setActiveOption] = useState(-1);
  const [userInput, setUserInput] = useState('');
  const [visible, setVisible] = useState(false);
  const [suggestionError, setSuggestionError] = useState(false);

  const fetchData = async (builds, series_id, build_id) => {
    dispatch({ type: 'setLoadingState', loadingState: true });
    try {
      const res = await fetch(
        `/data/history?builds=${builds}&series=${series_id}`,
        //`/data/history?start_from=${build_id}&series=${series_id}&builds=${builds}`,
        {}
      );
      const json = await res.json();
      dispatch({ type: 'setLoadingState', loadingState: false });
      dispatch({ type: 'updateHistory', historyData: json });
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
      console.log(branch);
      dispatch({
        type: 'setSelectedBranch',
        name: branchAndTeam,
        id: branch.id
      });
      //this.props.history.push('/history/',branch.id,'/','30','/')
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
        console.log(selectedBuild);
        const branchNameAndTeam = document.getElementById(activeOption)
          .innerText;
        const branchId = document
          .getElementById(activeOption)
          .getAttribute('tabIndex');
        dispatch({
          type: 'setSelectedBranch',
          name: branchNameAndTeam,
          id: branchId
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
      (e.type === 'focus' || e.type === 'mousedown') && suggestions.length > 0
    );

  return (
    <div id="branch-filter-container" css={filterStyles}>
      <h2 id="branch-heading">Series / Branch: {selectedBranchState.name}</h2>
      <form autoComplete="off" action="#" className="search-form">
        <div className="autocomplete">
          <label htmlFor="search-branch" className="sr-show">
            Series / Branch
          </label>
          <input
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
          <div
            className="suggestion-container"
            id="suggestions"
            style={{ display: visible ? 'block' : 'none' }}
            aria-live="polite"
          >
            {suggestions &&
              suggestions.map(({ id, name, team }, index) => {
                const cls = index === activeOption ? 'option-active' : '';
                return (
                  <div
                    role="button"
                    tabIndex={id}
                    className={`suggestion - item ${cls}`}
                    name={name}
                    id={index}
                    key={id}
                    onMouseDown={e => handleClick(e)}
                    onMouseEnter={e => handleSuggestionItemHover(e)}
                    onMouseLeave={e => handleSuggestionItemHover(e)}
                    onKeyDown={() => handleKeyDown()}
                  >
                    {name} - {team}
                  </div>
                );
              })}
          </div>
          <div
            className="suggestions-error"
            style={{ display: suggestionError ? 'block' : 'none' }}
          >
            No branches matching text found
          </div>
        </div>
      </form>
    </div>
  );
};

export default BranchFilter;
