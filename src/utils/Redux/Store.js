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
  detailIdea: null,
  detailIdeaPageHeight: 162,
  ideaDescHeight: 0,
  storyBehindHeight: 0,
  leanCanvasHeight: 0,
  teamsHeight: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_SHOW_LOADING') {
    return {...state, showLoading: action.value};
  }
  if (action.type === 'SET_SHOW_REFRESH_BUTTON') {
    return {...state, showRefreshButton: action.value};
  }
  if (action.type === 'SET_DETAIL_IDEA') {
    return {...state, detailIdea: action.value};
  }
  if (action.type === 'SET_DETAIL_IDEA_PAGE_HEIGHT') {
    return {...state, detailIdeaPageHeight: action.value};
  }
  if (action.type === 'SET_IDEA_DESC_HEIGHT') {
    return {...state, ideaDescHeight: action.value};
  }
  if (action.type === 'SET_STORY_BEHIND_HIGHT') {
    return {...state, storyBehindHeight: action.value};
  }
  if (action.type === 'SET_LEAN_CANVAS_HEIGHT') {
    return {...state, leanCanvasHeight: action.value};
  }
  if (action.type === 'SET_TEAMS_HEIGHT') {
    return {...state, teamsHeight: action.value};
  }

  return state;
};

const store = createStore(reducer);

export default store;
