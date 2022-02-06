import {
  GET_SESSIONS_FETCHING,
  GET_SESSIONS_FULFILLED,
  GET_SESSIONS_REJECTED,
  GET_SESSION_BY_ID_FETCHING,
  GET_SESSION_BY_ID_FULFILLED,
  GET_SESSION_BY_ID_REJECTED,
  GET_SESSIONS_OPTIONS_FETCHING,
  GET_SESSIONS_OPTIONS_FULFILLED,
  GET_SESSIONS_OPTIONS_REJECTED,
  ADD_SESSIONS_FETCHING,
  ADD_SESSIONS_FULFILLED,
  ADD_SESSIONS_REJECTED,
  DELETE_SESSIONS_FETCHING,
  DELETE_SESSIONS_FULFILLED,
  DELETE_SESSIONS_REJECTED,
  UPDATE_SESSIONS_FETCHING,
  UPDATE_SESSIONS_FULFILLED,
  UPDATE_SESSIONS_REJECTED,
  CLEAR_SESSIONS_ERROR,
  CLEAR_SELECTED_SESSION
} from './constants';

export const getSessionsFetching = () => ({
  type: GET_SESSIONS_FETCHING
});

export const getSessionsFulfilled = (payload) => ({
  type: GET_SESSIONS_FULFILLED,
  payload
});

export const getSessionsRejected = (error) => ({
  type: GET_SESSIONS_REJECTED,
  error
});

export const getSessionByIdFetching = () => {
  return {
    type: GET_SESSION_BY_ID_FETCHING
  };
};

export const getSessionByIdFulfilled = (data) => {
  return {
    type: GET_SESSION_BY_ID_FULFILLED,
    payload: data
  };
};

export const getSessionByIdRejected = (error) => {
  return {
    type: GET_SESSION_BY_ID_REJECTED,
    payload: error
  };
};

export const getSessionsOptionsFetching = () => {
  return {
    type: GET_SESSIONS_OPTIONS_FETCHING
  };
};
export const getSessionsOptionsFulfilled = (resource, payload) => {
  return {
    type: GET_SESSIONS_OPTIONS_FULFILLED,
    resource,
    payload
  };
};
export const getSessionsOptionsRejected = () => {
  return {
    type: GET_SESSIONS_OPTIONS_REJECTED
  };
};

export const addSessionsFetching = () => ({
  type: ADD_SESSIONS_FETCHING
});

export const addSessionsFulfilled = (payload) => ({
  type: ADD_SESSIONS_FULFILLED,
  payload
});

export const addSessionsRejected = (error) => ({
  type: ADD_SESSIONS_REJECTED,
  error
});

export const deleteSessionsFetching = () => ({
  type: DELETE_SESSIONS_FETCHING
});

export const deleteSessionsFulfilled = (payload) => ({
  type: DELETE_SESSIONS_FULFILLED,
  payload
});

export const deleteSessionsRejected = (error) => ({
  type: DELETE_SESSIONS_REJECTED,
  error
});

export const updateSessionsFetching = () => ({
  type: UPDATE_SESSIONS_FETCHING
});

export const updateSessionsFulfilled = (payload) => ({
  type: UPDATE_SESSIONS_FULFILLED,
  payload
});

export const updateSessionsRejected = (error) => ({
  type: UPDATE_SESSIONS_REJECTED,
  error
});

export const clearSessionsError = () => ({
  type: CLEAR_SESSIONS_ERROR
});

export const cleanSelectedSession = () => {
  return {
    type: CLEAR_SELECTED_SESSION
  };
};
