const reducer = (state, action) => {
    switch (action.type) {
        case 'updateHistory':
            return {
                ...state,
                historyDataState: action.historyData,
            };
        case 'setAmountOfBuilds':
            return {
                ...state,
                amountOfBuilds: action.amountOfBuilds,
            };
        case 'setFailureList':
            return {
                ...state,
                failureList: action.failures,
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

        case 'setBranches':
            return {
                ...state,
                branchesState: action.branches,
            };
        case 'setSelectedBranch':
            return {
                ...state,
                selectedBranchState: {
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
        case 'setSelectedBuild':
            return {
                ...state,
                selectedBuildState: action.selectedBuild,
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

        case 'setTestStabilityList':
            return {
                ...state,
                testStabilityList: action.data,
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
        case 'flushHistory':
            return {
                ...state,
                historyDataState: null,
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

        default:
            return state;
    }
};

export default reducer;
