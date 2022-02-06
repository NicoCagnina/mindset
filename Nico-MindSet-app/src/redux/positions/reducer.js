import {
  GET_POSITIONS_FETCHING,
  GET_POSITIONS_FULFILLED,
  GET_POSITIONS_REJECTED,
  GET_POSITION_BY_ID_FETCHING,
  GET_POSITION_BY_ID_FULFILLED,
  GET_POSITION_BY_ID_REJECTED,
  ADD_POSITIONS_FETCHING,
  ADD_POSITIONS_FULFILLED,
  ADD_POSITIONS_REJECTED,
  DELETE_POSITIONS_FETCHING,
  DELETE_POSITIONS_FULFILLED,
  DELETE_POSITIONS_REJECTED,
  UPDATE_POSITIONS_FETCHING,
  UPDATE_POSITIONS_FULFILLED,
  UPDATE_POSITIONS_REJECTED,
  CLEAR_POSITIONS_ERROR,
  CLEAR_SELECTED_POSITION
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  selectedItem: {},
  error: ''
};

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSITIONS_FETCHING:
      return {
        ...state,
        error: initialState.error,
        isLoading: true
      };
    case GET_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_POSITION_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    case GET_POSITION_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_POSITION_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ADD_POSITIONS_FETCHING:
      return {
        ...state,
        error: initialState.error,
        isLoading: true
      };
    case ADD_POSITIONS_FULFILLED:
      state.list.push(action.payload);
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case ADD_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_POSITIONS_FETCHING:
      return {
        ...state,
        error: initialState.error,
        isLoading: true
      };
    case DELETE_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((positions) => positions._id !== action.payload)
      };
    case DELETE_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_POSITIONS_FETCHING:
      return {
        ...state,
        error: initialState.error,
        isLoading: true
      };
    case UPDATE_POSITIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((el) => {
          return el._id === action.payload._id ? action.payload : el;
        })
      };
    case UPDATE_POSITIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_POSITIONS_ERROR:
      return {
        ...state,
        error: ''
      };
    case CLEAR_SELECTED_POSITION: {
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    }
    default:
      return state;
  }
};

export default positionsReducer;
