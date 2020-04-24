import React, { createContext, useContext, useReducer } from 'react';
export const StateContext = createContext();

const initialState = {
    historyDataState: null,
    loadingState: false,
    errorState: null,
    amountOfBuilds: 10,
    amountFilteredData: null,
    lastRunFilterFail: {
        isChecked: false,
        filterType: ''
    },
    lastRunFilterPass: {
        isChecked: false,
        filterType: ''
    },
    branchesState: null,
    selectedBranchState: { name: 'All builds', id: 1 },
    metadataState: [],
    selectedBuildState: {}
};

export const StateProvider = ({ reducer, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
