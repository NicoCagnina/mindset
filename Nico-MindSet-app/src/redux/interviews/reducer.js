import {
  GET_INTERVIEWS_FETCHING,
  GET_INTERVIEWS_FULFILLED,
  GET_INTERVIEWS_REJECTED,
  GET_INTERVIEW_BY_ID_FETCHING,
  GET_INTERVIEW_BY_ID_FULFILLED,
  GET_INTERVIEW_BY_ID_REJECTED,
  ADD_INTERVIEWS_FETCHING,
  ADD_INTERVIEWS_FULFILLED,
  ADD_INTERVIEWS_REJECTED,
  DELETE_INTERVIEWS_FETCHING,
  DELETE_INTERVIEWS_FULFILLED,
  DELETE_INTERVIEWS_REJECTED,
  UPDATE_INTERVIEWS_FETCHING,
  UPDATE_INTERVIEWS_FULFILLED,
  UPDATE_INTERVIEWS_REJECTED,
  CLEAR_INTERVIEWS_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  interview: [],
  selectedItem: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_INTERVIEW_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    case GET_INTERVIEW_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_INTERVIEW_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ADD_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case ADD_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((interview) => interview._id !== action.payload)
      };
    case DELETE_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_INTERVIEWS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_INTERVIEWS_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_INTERVIEWS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_INTERVIEWS_ERROR:
      return {
        ...state,
        error: ''
      };
    case CLEAN_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    default:
      return state;
  }
};

export default reducer;
