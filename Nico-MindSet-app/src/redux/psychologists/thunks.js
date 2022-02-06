import {
  getPsychologistsFetching,
  getPsychologistsFulfilled,
  getPsychologistsRejected,
  getPsychologistByIdFetching,
  getPsychologistByIdFulfilled,
  getPsychologistByIdRejected,
  addPsychologistFetching,
  addPsychologistFulfilled,
  addPsychologistRejected,
  deletePsychologistFetching,
  deletePsychologistFulfilled,
  deletePsychologistRejected,
  updatePsychologistFetching,
  updatePsychologistFulfilled,
  updatePsychologistRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/psychologists`;
let token;

export const getPsychologists = () => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getPsychologistsFetching());
    return fetch(URL, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPsychologistsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getPsychologistsRejected(error.toString()));
      });
  };
};

export const getPsychologistById = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getPsychologistByIdFetching());
    return fetch(`${URL}/${id}`, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ msg }) => {
            throw new Error(msg);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getPsychologistByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getPsychologistByIdRejected(error.toString()));
      });
  };
};

export const addPsychologist = (psychologist) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(addPsychologistFetching());
    return fetch(`${process.env.REACT_APP_API}/auth/register/psychologist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(psychologist)
    })
      .then((response) => {
        if (response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(addPsychologistFulfilled(response));
      })
      .catch((error) => {
        dispatch(addPsychologistRejected(error.toString()));
      });
  };
};

export const updatePsychologist = (psychologistId, psychologist) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(updatePsychologistFetching());
    return fetch(`${URL}/${psychologistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(psychologist)
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(updatePsychologistFulfilled(response));
      })
      .catch((error) => {
        dispatch(updatePsychologistRejected(error.toString()));
      });
  };
};

export const deletePsychologist = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(deletePsychologistFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deletePsychologistFulfilled(id));
      })
      .catch((error) => {
        dispatch(deletePsychologistRejected(error.toString()));
      });
  };
};
