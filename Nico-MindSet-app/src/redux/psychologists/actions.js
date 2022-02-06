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

export const getPsychologistsFetching = () => {
  return {
    type: GET_PSYCHOLOGISTS_FETCHING
  };
};

export const getPsychologistsFulfilled = (data) => {
  return {
    type: GET_PSYCHOLOGISTS_FULFILLED,
    payload: data
  };
};

export const getPsychologistsRejected = (error) => {
  return {
    type: GET_PSYCHOLOGISTS_REJECTED,
    payload: error
  };
};

export const getPsychologistByIdFetching = () => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_FETCHING
  };
};

export const getPsychologistByIdFulfilled = (data) => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_FULFILLED,
    payload: data
  };
};

export const getPsychologistByIdRejected = (error) => {
  return {
    type: GET_PSYCHOLOGIST_BY_ID_REJECTED,
    payload: error
  };
};

export const addPsychologistFetching = () => {
  return {
    type: ADD_PSYCHOLOGIST_FETCHING
  };
};

export const addPsychologistFulfilled = (data) => {
  return {
    type: ADD_PSYCHOLOGIST_FULFILLED,
    payload: data
  };
};

export const addPsychologistRejected = (error) => {
  return {
    type: ADD_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const deletePsychologistFetching = () => {
  return {
    type: DELETE_PSYCHOLOGIST_FETCHING
  };
};

export const deletePsychologistFulfilled = (data) => {
  return {
    type: DELETE_PSYCHOLOGIST_FULFILLED,
    payload: data
  };
};

export const deletePsychologistRejected = (error) => {
  return {
    type: DELETE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const updatePsychologistFetching = () => {
  return {
    type: UPDATE_PSYCHOLOGIST_FETCHING
  };
};

export const updatePsychologistFulfilled = (id) => {
  return {
    type: UPDATE_PSYCHOLOGIST_FULFILLED,
    payload: id
  };
};

export const updatePsychologistRejected = (error) => {
  return {
    type: UPDATE_PSYCHOLOGIST_REJECTED,
    payload: error
  };
};

export const clearPsychologistsError = () => {
  return {
    type: CLEAR_PSYCHOLOGIST_ERROR
  };
};

export const cleanSelectedItem = () => {
  return {
    type: CLEAN_SELECTED_ITEM
  };
};
