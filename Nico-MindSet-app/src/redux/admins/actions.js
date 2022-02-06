import {
  GET_ADMINS_FETCHING,
  GET_ADMINS_FULFILLED,
  GET_ADMINS_REJECTED,
  GET_ADMIN_BY_ID_FETCHING,
  GET_ADMIN_BY_ID_FULFILLED,
  GET_ADMIN_BY_ID_REJECTED,
  ADD_ADMINS_FETCHING,
  ADD_ADMINS_FULFILLED,
  ADD_ADMINS_REJECTED,
  DELETE_ADMINS_FETCHING,
  DELETE_ADMINS_FULFILLED,
  DELETE_ADMINS_REJECTED,
  UPDATE_ADMINS_FETCHING,
  UPDATE_ADMINS_FULFILLED,
  UPDATE_ADMINS_REJECTED,
  CLEAN_ERROR,
  CLEAN_SELECTED_ITEM
} from './constants';

export const getAdminsFetching = () => ({
  type: GET_ADMINS_FETCHING
});

export const getAdminsFulfilled = (data) => ({
  type: GET_ADMINS_FULFILLED,
  payload: data
});

export const getAdminsRejected = (error) => ({
  type: GET_ADMINS_REJECTED,
  payload: error
});

export const getAdminByIdFetching = () => {
  return {
    type: GET_ADMIN_BY_ID_FETCHING
  };
};

export const getAdminByIdFulfilled = (data) => {
  return {
    type: GET_ADMIN_BY_ID_FULFILLED,
    payload: data
  };
};

export const getAdminByIdRejected = (error) => {
  return {
    type: GET_ADMIN_BY_ID_REJECTED,
    payload: error
  };
};

export const addAdminsFetching = () => ({
  type: ADD_ADMINS_FETCHING
});

export const addAdminsFulfilled = (data) => ({
  type: ADD_ADMINS_FULFILLED,
  payload: data
});

export const addAdminsRejected = (error) => ({
  type: ADD_ADMINS_REJECTED,
  payload: error
});

export const deleteAdminsFetching = () => ({
  type: DELETE_ADMINS_FETCHING
});

export const deleteAdminsFulfilled = (id) => ({
  type: DELETE_ADMINS_FULFILLED,
  payload: id
});

export const deleteAdminsRejected = (error) => ({
  type: DELETE_ADMINS_REJECTED,
  payload: error
});

export const updateAdminsFetching = () => ({
  type: UPDATE_ADMINS_FETCHING
});

export const updateAdminsFulfilled = (id) => ({
  type: UPDATE_ADMINS_FULFILLED,
  payload: id
});

export const updateAdminsRejected = (error) => ({
  type: UPDATE_ADMINS_REJECTED,
  payload: error
});

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const cleanSelectedItem = () => {
  return {
    type: CLEAN_SELECTED_ITEM
  };
};
