import React, { createContext, useReducer, useMemo } from 'react';
import logger from 'use-reducer-logger';
export const StateContext = createContext();

const initialState = {
    loadingState: false,
    errorState: null,
    amountOfBuilds: 5,
    offset: 0,
    lastRunFilterFail: {
        isChecked: false,
        filterType: '',
    },
    lastRunFilterPass: {
        isChecked: false,
        filterType: '',
    },
    compareFilterMatch: {
        isChecked: false,
    },
    compareFilterMismatch: {
        isChecked: false,
    },
    comparedDataState: [[], []],
    selectedSeriesState: { name: 'All builds', id: 1 },
    metadataState: [],
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

    const [state, dispatch] = useReducer(rootReducer, initialState);
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    );
};
