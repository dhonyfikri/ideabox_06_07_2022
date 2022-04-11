import {createStore} from 'redux';

const noAction = () => {};

const initialState = {
  showLoading: {show: false, message: 'Loading...'},
  showRefreshButton: {
    show: false,
    message: 'Refresh',
    disabled: false,
    onPress: noAction,
  },
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_SHOW_LOADING') {
    return {...state, showLoading: action.value};
  }
  if (action.type === 'SET_SHOW_REFRESH_BUTTON') {
    return {...state, showRefreshButton: action.value};
  }

  return state;
};

const store = createStore(reducer);

export default store;
