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
  GET_APPLICATIONS_OPTIONS_FETCHING,
  GET_APPLICATIONS_OPTIONS_FULFILLED,
  GET_APPLICATIONS_OPTIONS_REJECTED,
  CLEAR_APPLICATIONS_ERROR,
  CLEAR_SELECTED_APPLICATIONS
} from './constants';

export const getApplicationsFetching = () => ({
  type: GET_APPLICATIONS_FETCHING
});

export const getApplicationsFulfilled = (payload) => ({
  type: GET_APPLICATIONS_FULFILLED,
  payload
});

export const getApplicationsRejected = (error) => ({
  type: GET_APPLICATIONS_REJECTED,
  error
});

export const getApplicationsByIdFetching = () => {
  return {
    type: GET_APPLICATIONS_BY_ID_FETCHING
  };
};

export const getApplicationsByIdFulfilled = (data) => {
  return {
    type: GET_APPLICATIONS_BY_ID_FULFILLED,
    payload: data
  };
};

export const getApplicationsByIdRejected = (error) => {
  return {
    type: GET_APPLICATIONS_BY_ID_REJECTED,
    payload: error
  };
};

export const addApplicationsFetching = () => ({
  type: ADD_APPLICATIONS_FETCHING
});

export const addApplicationsFulfilled = (payload) => ({
  type: ADD_APPLICATIONS_FULFILLED,
  payload
});

export const addApplicationsRejected = (error) => ({
  type: ADD_APPLICATIONS_REJECTED,
  error
});

export const getApplicationsOptionsFetching = () => {
  return {
    type: GET_APPLICATIONS_OPTIONS_FETCHING
  };
};

export const getApplicationsOptionsFulfilled = (resource, payload) => {
  return {
    type: GET_APPLICATIONS_OPTIONS_FULFILLED,
    resource,
    payload
  };
};

export const getApplicationsOptionsRejected = () => {
  return {
    type: GET_APPLICATIONS_OPTIONS_REJECTED
  };
};

export const deleteApplicationsFetching = () => ({
  type: DELETE_APPLICATIONS_FETCHING
});

export const deleteApplicationsFulfilled = (id) => ({
  type: DELETE_APPLICATIONS_FULFILLED,
  payload: id
});

export const deleteApplicationsRejected = (error) => ({
  type: DELETE_APPLICATIONS_REJECTED,
  error
});

export const updateApplicationsFetching = () => ({
  type: UPDATE_APPLICATIONS_FETCHING
});

export const updateApplicationsFulfilled = (payload) => ({
  type: UPDATE_APPLICATIONS_FULFILLED,
  payload
});

export const updateApplicationsRejected = (error) => ({
  type: UPDATE_APPLICATIONS_REJECTED,
  error
});

export const clearApplicationsError = () => ({
  type: CLEAR_APPLICATIONS_ERROR
});

export const cleanSelectedApplications = () => {
  return {
    type: CLEAR_SELECTED_APPLICATIONS
  };
};
