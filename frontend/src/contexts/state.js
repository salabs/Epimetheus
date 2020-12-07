import React, { createContext, useContext, useReducer } from 'react';
import logger from 'use-reducer-logger';
export const StateContext = createContext();

const initialState = {
    historyDataState: null,
    loadingState: false,
    errorState: null,
    amountOfBuilds: 5,
    offset: 0,
    amountFilteredData: null,
    lastRunFilterFail: {
        isChecked: false,
        filterType: '',
    },
    lastRunFilterPass: {
        isChecked: false,
        filterType: '',
    },
    branchesState: null,
    selectedBranchState: { team: 'Loading', name: 'Loading', id: 1 },
    metadataState: [],
    testStabilityList: [],
    failureList: [],
    selectedBuildState: {},
    selectedSuiteState: null,
    stabilityChecker: 'unstable',
    parentData: {
        seriesData: {
            last_build_id: '',
            last_status: '',
            last_started: '',
        },
        buildData: null,
    },
};

export const StateProvider = ({ reducer, children }) => {
    const rootReducer =
        process.env.NODE_ENV === 'development' ? logger(reducer) : reducer;

    return (
        <StateContext.Provider value={useReducer(rootReducer, initialState)}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);
