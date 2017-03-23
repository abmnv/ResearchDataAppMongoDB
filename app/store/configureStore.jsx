import * as redux from 'redux';
import thunk from 'redux-thunk';

import * as reducers from 'reducers';

export var configure = () => {

  var reducer = redux.combineReducers({
    projects: reducers.projectReducer,
    activeProjectId: reducers.activeProjectReducer,
    editModeStatus: reducers.editModeStatusReducer,
    isLoading: reducers.setLoadingStatusReducer,
    searchText: reducers.setSearchText
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
