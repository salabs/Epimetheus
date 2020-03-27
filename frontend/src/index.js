import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './contexts/state';
import reducer from './reducer';
import './index.css';

const initialState = {
  historyDataState: null,
  loadingState: false,
  errorState: null,
  amountOfBuilds: 10,
  amountFilteredData: null,
  historyFilterPass: {
    isChecked: false,
    filterType: ''
  },
  historyFilterFail: {
    isChecked: false,
    filterType: ''
  },
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

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
