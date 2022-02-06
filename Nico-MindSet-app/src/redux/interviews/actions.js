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

export const getInterviewsFetching = () => ({
  type: GET_INTERVIEWS_FETCHING
});

export const getInterviewsFulfilled = (payload) => ({
  type: GET_INTERVIEWS_FULFILLED,
  payload
});

export const getInterviewsRejected = (error) => ({
  type: GET_INTERVIEWS_REJECTED,
  error
});

export const getInterviewByIdFetching = () => {
  return {
    type: GET_INTERVIEW_BY_ID_FETCHING
  };
};

export const getInterviewByIdFulfilled = (data) => {
  return {
    type: GET_INTERVIEW_BY_ID_FULFILLED,
    payload: data
  };
};

export const getInterviewByIdRejected = (error) => {
  return {
    type: GET_INTERVIEW_BY_ID_REJECTED,
    payload: error
  };
};

export const addInterviewsFetching = () => ({
  type: ADD_INTERVIEWS_FETCHING
});

export const addInterviewsFulfilled = (payload) => ({
  type: ADD_INTERVIEWS_FULFILLED,
  payload
});

export const addInterviewsRejected = (error) => ({
  type: ADD_INTERVIEWS_REJECTED,
  error
});

export const deleteInterviewsFetching = () => ({
  type: DELETE_INTERVIEWS_FETCHING
});

export const deleteInterviewsFulfilled = (id) => ({
  type: DELETE_INTERVIEWS_FULFILLED,
  payload: id
});

export const deleteInterviewsRejected = (error) => ({
  type: DELETE_INTERVIEWS_REJECTED,
  error
});

export const updateInterviewsFetching = () => ({
  type: UPDATE_INTERVIEWS_FETCHING
});

export const updateInterviewsFulfilled = (payload) => ({
  type: UPDATE_INTERVIEWS_FULFILLED,
  payload
});

export const updateInterviewsRejected = (error) => ({
  type: UPDATE_INTERVIEWS_REJECTED,
  error
});

export const clearInterviewsError = () => {
  return {
    type: CLEAR_INTERVIEWS_ERROR
  };
};

export const cleanSelectedItem = () => {
  return {
    type: CLEAN_SELECTED_ITEM
  };
};
