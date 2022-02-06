import {
  GET_APPLICATIONS_FETCHING,
  GET_APPLICATIONS_FULFILLED,
  GET_APPLICATIONS_REJECTED,
  GET_APPLICATIONS_BY_ID_FETCHING,
  GET_APPLICATIONS_BY_ID_FULFILLED,
  GET_APPLICATIONS_BY_ID_REJECTED,
  ADD_APPLICATIONS_FETCHING,
  ADD_APPLICATIONS_FULFILLED,
  ADD_APPLICATIONS_REJECTED,
  DELETE_APPLICATIONS_FETCHING,
  DELETE_APPLICATIONS_FULFILLED,
  DELETE_APPLICATIONS_REJECTED,
  UPDATE_APPLICATIONS_FETCHING,
  UPDATE_APPLICATIONS_FULFILLED,
  UPDATE_APPLICATIONS_REJECTED,
  CLEAR_APPLICATIONS_ERROR,
  CLEAR_SELECTED_APPLICATIONS,
  GET_APPLICATIONS_OPTIONS_FETCHING,
  GET_APPLICATIONS_OPTIONS_FULFILLED,
  GET_APPLICATIONS_OPTIONS_REJECTED
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  application: [],
  options: { positions: [], postulants: [], clients: [] },
  selectedItem: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_APPLICATIONS_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        selectedItem: initialState.selectedItem
      };
    case GET_APPLICATIONS_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_APPLICATIONS_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list]
      };
    case ADD_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((application) => application._id !== action.payload)
      };
    case DELETE_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_APPLICATIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_APPLICATIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((el) => {
          return el._id === action.payload._id ? action.payload : el;
        })
      };
    case UPDATE_APPLICATIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_APPLICATIONS_ERROR:
      return {
        ...state,
        error: ''
      };
    case CLEAR_SELECTED_APPLICATIONS: {
      return {
        ...state,
        selectedItem: initialState.selectedItem
      };
    }
    case GET_APPLICATIONS_OPTIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_APPLICATIONS_OPTIONS_FULFILLED: {
      const addedOptions = action.payload.map((option) => {
        let lebelValue = '';
        if (option.firstName !== undefined) {
          lebelValue = `${option.firstName} ${option.lastName}`;
        }
        if (option.job !== undefined) {
          lebelValue = `${option.job}`;
        }
        if (option.customerName !== undefined) {
          lebelValue = `${option.customerName}`;
        }
        return {
          value: option._id,
          label: lebelValue
        };
      });
      const options = { ...state.options };
      options[action.resource] = addedOptions;
      return {
        ...state,
        options,
        isLoading: false
      };
    }
    case GET_APPLICATIONS_OPTIONS_REJECTED:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
