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

export const getPositionsFetching = () => ({
  type: GET_POSITIONS_FETCHING
});

export const getPositionsFulfilled = (payload) => ({
  type: GET_POSITIONS_FULFILLED,
  payload
});

export const getPositionsRejected = (error) => ({
  type: GET_POSITIONS_REJECTED,
  error
});

export const getPositionByIdFetching = () => {
  return {
    type: GET_POSITION_BY_ID_FETCHING
  };
};

export const getPositionByIdFulfilled = (data) => {
  return {
    type: GET_POSITION_BY_ID_FULFILLED,
    payload: data
  };
};

export const getPositionByIdRejected = (error) => {
  return {
    type: GET_POSITION_BY_ID_REJECTED,
    payload: error
  };
};

export const addPositionsFetching = () => ({
  type: ADD_POSITIONS_FETCHING
});

export const addPositionsFulfilled = (payload) => ({
  type: ADD_POSITIONS_FULFILLED,
  payload
});

export const addPositionsRejected = (error) => ({
  type: ADD_POSITIONS_REJECTED,
  error
});

export const deletePositionsFetching = () => ({
  type: DELETE_POSITIONS_FETCHING
});

export const deletePositionsFulfilled = (payload) => ({
  type: DELETE_POSITIONS_FULFILLED,
  payload
});

export const deletePositionsRejected = (error) => ({
  type: DELETE_POSITIONS_REJECTED,
  error
});

export const updatePositionsFetching = () => ({
  type: UPDATE_POSITIONS_FETCHING
});

export const updatePositionsFulfilled = (payload) => ({
  type: UPDATE_POSITIONS_FULFILLED,
  payload
});

export const updatePositionsRejected = (error) => ({
  type: UPDATE_POSITIONS_REJECTED,
  error
});

export const clearPositionsError = () => ({
  type: CLEAR_POSITIONS_ERROR
});

export const cleanSelectedPosition = () => {
  return {
    type: CLEAR_SELECTED_POSITION
  };
};
