import { fromJS } from 'immutable';

import {combineReducers} from 'redux';
import {connectRouter, LOCATION_CHANGE} from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
// import {LOCATION_CHANGE} from 'react-router-redux';

const routeInitialState = fromJS({
  location: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    route: routeReducer,
    global: globalReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
