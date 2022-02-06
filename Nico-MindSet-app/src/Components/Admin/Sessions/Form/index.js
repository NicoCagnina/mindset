import { useDispatch, useSelector } from 'react-redux';
import {
  addSession,
  updateSession,
  getSessionById,
  getSessionsOptions
} from 'redux/sessions/thunks';
import { clearSessionsError, cleanSelectedSession } from 'redux/sessions/actions';
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button/index';
import Modal from 'Components/Shared/Modal';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import { Form, Field } from 'react-final-form';

const SessionsForm = () => {
  const selectedItem = useSelector((store) => store.sessions.selectedItem);
  const error = useSelector((store) => store.sessions.error);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading),
    psychologistsLoading: useSelector((store) => store.psychologists.isLoading),
    postulantsLoading: useSelector((store) => store.postulants.isLoading)
  };
  const options = useSelector((store) => store.sessions.options);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useQuery();
  const sessionId = params.get('id');

  useEffect(() => {
    if (sessionId) {
      dispatch(getSessionById(sessionId));
    }
    dispatch(getSessionsOptions('postulants'));
    dispatch(getSessionsOptions('psychologists'));
    dispatch(cleanSelectedSession());
  }, [dispatch]);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (formValues) => {
    if (sessionId) {
      dispatch(updateSession(sessionId, formValues));
    } else {
      dispatch(addSession(formValues));
    }
    history.replace('/admin/sessions/list');
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            {Object.values(loading).some(Boolean) && (
              <div className={styles.spinnerContainer}>
                <LoadingSpinner />
              </div>
            )}
            <Field
              className={styles.select}
              component={Select}
              label="Psychologist:"
              name="psychology"
              id="psychologist"
              options={options.psychologists}
            />
            <Field
              className={styles.select}
              component={Select}
              label="Postulant:"
              name="postulant"
              id="postulant"
              options={options.postulants}
            />
            <Field
              className={styles.input}
              label="date"
              name="date"
              id="date"
              type="datetime"
              validate={required}
              component={Input}
            />
            <Field
              className={styles.input}
              label="time"
              name="time"
              id="time"
              type="text"
              validate={required}
              component={Input}
            />
            <Field
              className={styles.input}
              label="status"
              name="status"
              id="status"
              type="text"
              validate={required}
              component={Input}
            />
            <Button
              className={styles.button}
              type="submit"
              content={sessionId ? 'Update Position' : 'Create position'}
              disabled={
                loading.postulantsLoading ||
                loading.sessionsLoading ||
                loading.psychologistsLoading ||
                formProps.submitting ||
                formProps.pristine ||
                formProps.hasValidationErrors
              }
            />
          </form>
        )}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearSessionsError())}
        type={'Error'}
      />
    </div>
  );
};

export default SessionsForm;
