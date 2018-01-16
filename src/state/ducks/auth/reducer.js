import { handleActions } from 'redux-actions';

import * as types from './types';

const defaultState = {
  authenticated: false,
};

export default handleActions({
  [types.LOGIN]: () => ({
    authenticated: true,
  }),
  [types.LOGOUT]: () => ({
    authenticated: false,
  }),
}, defaultState);
