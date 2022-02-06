import {
  GET_PROFILES_OPTIONS_FETCHING,
  GET_PROFILES_OPTIONS_FULFILLED,
  GET_PROFILES_OPTIONS_REJECTED,
  GET_PROFILES_FETCHING,
  GET_PROFILES_FULFILLED,
  GET_PROFILES_REJECTED,
  GET_PROFILE_BY_ID_FETCHING,
  GET_PROFILE_BY_ID_FULFILLED,
  GET_PROFILE_BY_ID_REJECTED,
  ADD_PROFILE_FETCHING,
  ADD_PROFILE_FULFILLED,
  ADD_PROFILE_REJECTED,
  DELETE_PROFILE_FETCHING,
  DELETE_PROFILE_FULFILLED,
  DELETE_PROFILE_REJECTED,
  UPDATE_PROFILE_FETCHING,
  UPDATE_PROFILE_FULFILLED,
  UPDATE_PROFILE_REJECTED,
  CLEAR_PROFILES_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

const initialState = {
  isLoading: false,
  list: [],
  error: '',
  profile: [],
  selectedItem: {},
  options: []
};

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES_OPTIONS_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROFILES_OPTIONS_FULFILLED: {
      const addedOptions = action.payload.map((option) => {
        return {
          value: option._id,
          label: option.profileName
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
    case GET_PROFILES_OPTIONS_REJECTED:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case GET_PROFILES_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROFILES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_PROFILE_BY_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
        selectedItem: initialState.selectedItem
      };
    case GET_PROFILE_BY_ID_FULFILLED:
      return {
        ...state,
        isLoading: false,
        selectedItem: action.payload
      };
    case GET_PROFILE_BY_ID_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ADD_PROFILE_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload]
      };
    case ADD_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case DELETE_PROFILE_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((profiles) => profiles._id !== action.payload)
      };
    case DELETE_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_PROFILE_FETCHING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((profile) => {
          return profile._id === action.payload._id ? action.payload : profile;
        })
      };
    case UPDATE_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case CLEAR_PROFILES_ERROR:
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

export default profilesReducer;
