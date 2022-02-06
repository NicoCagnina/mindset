import {
  GET_CLIENTS_FETCHING,
  GET_CLIENTS_FULFILLED,
  GET_CLIENTS_REJECTED,
  GET_CLIENTS_BY_ID_FETCHING,
  GET_CLIENTS_BY_ID_FULFILLED,
  GET_CLIENTS_BY_ID_REJECTED,
  ADD_CLIENTS_FETCHING,
  ADD_CLIENTS_FULFILLED,
  ADD_CLIENTS_REJECTED,
  DELETE_CLIENTS_FETCHING,
  DELETE_CLIENTS_FULFILLED,
  DELETE_CLIENTS_REJECTED,
  UPDATE_CLIENTS_FETCHING,
  UPDATE_CLIENTS_FULFILLED,
  UPDATE_CLIENTS_REJECTED,
  CLEAR_CLIENTS_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  selectedItem: {}
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_CLIENTS_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        selectedItem: initialState.selectedItem
      };
    case GET_CLIENTS_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_CLIENTS_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_CLIENTS_FULFILLED:
      if (!state.list.some((el) => el._id === action.payload._id)) state.list.push(action.payload);
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case ADD_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((clients) => clients._id !== action.payload)
      };
    case DELETE_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_CLIENTS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_CLIENTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((el) => {
          return el._id === action.payload._id ? action.payload : el;
        })
      };
    case UPDATE_CLIENTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_CLIENTS_ERROR:
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

export default clientsReducer;
