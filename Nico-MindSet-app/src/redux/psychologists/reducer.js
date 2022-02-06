import {
  GET_PSYCHOLOGISTS_FETCHING,
  GET_PSYCHOLOGISTS_FULFILLED,
  GET_PSYCHOLOGISTS_REJECTED,
  GET_PSYCHOLOGIST_BY_ID_FETCHING,
  GET_PSYCHOLOGIST_BY_ID_FULFILLED,
  GET_PSYCHOLOGIST_BY_ID_REJECTED,
  ADD_PSYCHOLOGIST_FETCHING,
  ADD_PSYCHOLOGIST_FULFILLED,
  ADD_PSYCHOLOGIST_REJECTED,
  DELETE_PSYCHOLOGIST_FETCHING,
  DELETE_PSYCHOLOGIST_FULFILLED,
  DELETE_PSYCHOLOGIST_REJECTED,
  UPDATE_PSYCHOLOGIST_FETCHING,
  UPDATE_PSYCHOLOGIST_FULFILLED,
  UPDATE_PSYCHOLOGIST_REJECTED,
  CLEAR_PSYCHOLOGIST_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: ''
};

const psychologistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PSYCHOLOGISTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PSYCHOLOGISTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PSYCHOLOGISTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_PSYCHOLOGIST_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    case GET_PSYCHOLOGIST_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_PSYCHOLOGIST_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ADD_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((psychologists) => psychologists._id !== action.payload)
      };
    case DELETE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_PSYCHOLOGIST_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PSYCHOLOGIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((psychologist) => {
          return psychologist._id === action.payload._id ? action.payload : psychologist;
        })
      };
    case UPDATE_PSYCHOLOGIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_PSYCHOLOGIST_ERROR:
      return {
        ...state,
        error: ''
      };
    case CLEAN_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    }
    default:
      return state;
  }
};

export default psychologistsReducer;
