import {
  getInterviewsFetching,
  getInterviewsFulfilled,
  getInterviewsRejected,
  getInterviewByIdFetching,
  getInterviewByIdFulfilled,
  getInterviewByIdRejected,
  addInterviewsFetching,
  addInterviewsFulfilled,
  addInterviewsRejected,
  deleteInterviewsFetching,
  deleteInterviewsFulfilled,
  deleteInterviewsRejected,
  updateInterviewsFetching,
  updateInterviewsFulfilled,
  updateInterviewsRejected
} from './actions';

const URL = `${process.env.REACT_APP_API}/interviews`;
let token;

export const getInterviews = () => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getInterviewsFetching());
    return fetch(URL, { headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        dispatch(getInterviewsFulfilled(response));
      })
      .catch((error) => {
        dispatch(getInterviewsRejected(error.toString()));
      });
  };
};

export const getInterviewById = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(getInterviewByIdFetching());
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
        dispatch(getInterviewByIdFulfilled(response));
        return response;
      })
      .catch((error) => {
        dispatch(getInterviewByIdRejected(error.toString()));
      });
  };
};

export const addInterviews = (interview) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(addInterviewsFetching());
    fetch(`${process.env.REACT_APP_API}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(interview)
    })
      .then((data) => data.json())
      .then((response) => {
        dispatch(addInterviewsFulfilled(response));
      })
      .catch((error) => {
        dispatch(addInterviewsRejected(error.toString()));
      });
  };
};

export const deleteInterviews = (id) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(deleteInterviewsFetching());
    fetch(`${process.env.REACT_APP_API}/interviews/${id}`, { method: 'DELETE', headers: { token } })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        dispatch(deleteInterviewsFulfilled(id));
      })
      .catch((error) => {
        dispatch(deleteInterviewsRejected(error.toString()));
      });
  };
};

export const updateInterviews = (interviewId, interview) => {
  return (dispatch) => {
    token = sessionStorage.getItem('token');
    dispatch(updateInterviewsFetching());
    return fetch(`${URL}/${interviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(interview)
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
        dispatch(updateInterviewsFulfilled(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(updateInterviewsRejected(error.toString()));
      });
  };
};
