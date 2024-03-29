const reducer = (state, action) => {
    switch (action.type) {
        case 'updateCompared':
            return {
                ...state,
                comparedDataState: action.compareData,
            };
        case 'setAmountOfBuilds':
            return {
                ...state,
                amountOfBuilds: action.amountOfBuilds,
            };
        case 'setLoadingState':
            return {
                ...state,
                loadingState: action.loadingState,
            };
        case 'setErrorState':
            return {
                ...state,
                errorState: action.errorState,
            };
        case 'setHistoryFilterType':
            return {
                ...state,
                historyFilter: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setHistoryFilterPass':
            return {
                ...state,
                historyFilterPass: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setHistoryFilterFail':
            return {
                ...state,
                historyFilterFail: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setLastRunFilterFail':
            return {
                ...state,
                lastRunFilterFail: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setLastRunFilterPass':
            return {
                ...state,
                lastRunFilterPass: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setCompareMatchFilter':
            return {
                ...state,
                compareFilterMatch: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setCompareMismatchFilter':
            return {
                ...state,
                compareFilterMismatch: {
                    filterType: action.filterType,
                    isChecked: action.isChecked,
                },
            };
        case 'setSelectedSeries':
            return {
                ...state,
                selectedSeriesState: {
                    name: action.name,
                    id: action.id,
                    team: action.team,
                },
            };
        case 'setMetadata':
            return {
                ...state,
                metadataState: action.metadata,
            };
        case 'setTeams':
            return {
                ...state,
                teamsState: action.teams,
            };
        case 'setSelectedSuiteState':
            return {
                ...state,
                selectedSuiteState: action.suite,
            };
        case 'setStabilityChecker':
            return {
                ...state,
                stabilityChecker: action.setStability,
            };
        case 'setSeriesData':
            return {
                ...state,
                parentData: {
                    ...state.parentData,
                    seriesData: action.seriesData,
                },
            };
        case 'setOffset':
            return {
                ...state,
                offset: action.offset,
            };
        case 'setBuildData':
            return {
                ...state,
                parentData: {
                    ...state.parentData,
                    buildData: action.buildData,
                },
            };
        case 'flushMetadata':
            return {
                ...state,
                metadataState: [],
            };
        case 'flushParentData':
            return {
                ...state,
                parentData: {
                    buildData: null,
                    seriesData: {
                        last_build_id: '',
                        last_status: '',
                        last_started: '',
                    },
                },
            };
        case 'flushSuiteState':
            return {
                ...state,
                selectedSuiteState: null,
            };
        case 'flushQueryParams':
            return {
                ...state,
                amountOfBuilds: 5,
                offset: 0,
            };
        default:
            return state;
    }
};

export default reducer;
