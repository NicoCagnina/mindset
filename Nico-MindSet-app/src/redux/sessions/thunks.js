import {
  getSessionsFetching,
  getSessionsFulfilled,
  getSessionsRejected,
  getSessionByIdFetching,
  getSessionByIdFulfilled,
  getSessionByIdRejected,
  getSessionsOptionsFulfilled,
  getSessionsOptionsRejected,
  getSessionsOptionsFetching,
  addSessionsFetching,
  addSessionsFulfilled,
  addSessionsRejected,
  deleteSessionsFetching,
  deleteSessionsFulfilled,
  deleteSessionsRejected,
  updateSessionsFetching,
  updateSessionsFulfilled,
  updateSessionsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/sessions`;
let token;

export const getSessions = () => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getSessionsFetching());
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
        dispatch(getSessionsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getSessionsRejected(error.toString()));
      });
  };
};

export const getSessionById = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getSessionByIdFetching());
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
        dispatch(getSessionByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getSessionByIdRejected(error.toString()));
      });
  };
};

export const getSessionsOptions = (resource) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getSessionsOptionsFetching());
    fetch(`${process.env.REACT_APP_API}/${resource}`, { headers: { token } })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          dispatch(getSessionsOptionsFulfilled(resource, data));
        }
        const data = await res.json();
        dispatch(getSessionsOptionsRejected(data));
      })
      .catch((error) => {
        dispatch(getSessionsOptionsRejected(error.toString()));
      });
  };
};

export const addSession = (session) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(addSessionsFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(session)
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
        dispatch(addSessionsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addSessionsRejected(error.toString()));
      });
  };
};

export const updateSession = (sessionId, session) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(updateSessionsFetching());
    return fetch(`${URL}/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(session)
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
        dispatch(updateSessionsFulfilled(response));
      })
      .catch((error) => {
        dispatch(updateSessionsRejected(error.toString()));
      });
  };
};

export const deleteSession = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(deleteSessionsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteSessionsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteSessionsRejected(error.toString()));
      });
  };
};
