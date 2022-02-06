import {
  getClientsFetching,
  getClientsFulfilled,
  getClientsRejected,
  getClientsByIdFetching,
  getClientsByIdFulfilled,
  getClientsByIdRejected,
  addClientsFetching,
  addClientsFulfilled,
  addClientsRejected,
  deleteClientsFetching,
  deleteClientsFulfilled,
  deleteClientsRejected,
  updateClientsFetching,
  updateClientsFulfilled,
  updateClientsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/clients`;
let token;

export const getClients = () => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getClientsFetching());
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
        dispatch(getClientsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getClientsRejected(error.toString()));
      });
  };
};

export const getClientById = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getClientsByIdFetching());
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
        dispatch(getClientsByIdFulfilled(response));
      })
      .catch((error) => {
        dispatch(getClientsByIdRejected(error.toString()));
      });
  };
};

export const addClient = (client) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(addClientsFetching());
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(client)
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
        dispatch(addClientsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addClientsRejected(error.toString()));
      });
  };
};

export const updateClient = (clientId, client) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(updateClientsFetching());
    return fetch(`${URL}/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(client)
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
        dispatch(updateClientsFulfilled(response));
      })
      .catch((error) => {
        dispatch(updateClientsRejected(error.toString()));
      });
  };
};

export const deleteClient = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(deleteClientsFetching());
    fetch(`${URL}/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteClientsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteClientsRejected(error.toString()));
      });
  };
};
