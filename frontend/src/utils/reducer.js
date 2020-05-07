const reducer = (state, action) => {
    switch (action.type) {
        case 'updateHistory':
            return {
                ...state,
                historyDataState: action.historyData
            };
        case 'setAmountOfBuilds':
            return {
                ...state,
                amountOfBuilds: action.amountOfBuilds
            };
        case 'setLoadingState':
            return {
                ...state,
                loadingState: action.loadingState
            };
        case 'setErrorState':
            return {
                ...state,
                errorState: action.errorState
            };
        case 'setHistoryFilterType':
            return {
                ...state,
                historyFilter: {
                    filterType: action.filterType,
                    isChecked: action.isChecked
                }
            };
        case 'setHistoryFilterPass':
            return {
                ...state,
                historyFilterPass: {
                    filterType: action.filterType,
                    isChecked: action.isChecked
                }
            };
        case 'setHistoryFilterFail':
            return {
                ...state,
                historyFilterFail: {
                    filterType: action.filterType,
                    isChecked: action.isChecked
                }
            };
        case 'setLastRunFilterFail':
            return {
                ...state,
                lastRunFilterFail: {
                    filterType: action.filterType,
                    isChecked: action.isChecked
                }
            };
        case 'setLastRunFilterPass':
            return {
                ...state,
                lastRunFilterPass: {
                    filterType: action.filterType,
                    isChecked: action.isChecked
                }
            };

        case 'setBranches':
            return {
                ...state,
                branchesState: action.branches
            };
        case 'setSelectedBranch':
            return {
                ...state,
                selectedBranchState: {
                    name: action.name,
                    id: action.id,
                    team: action.team
                }
            };
        case 'setMetadata':
            return {
                ...state,
                metadataState: action.metadata
            };
        case 'setSelectedBuild':
            return {
                ...state,
                selectedBuildState: action.selectedBuild
            };
        case 'setTeams':
            return {
                ...state,
                teamsState: action.teams
            };
        case 'setSeriesInfo':
            return {
                ...state,
                seriesInfo: action.seriesInfo
            };
        default:
            return state;
    }
};

export default reducer;
