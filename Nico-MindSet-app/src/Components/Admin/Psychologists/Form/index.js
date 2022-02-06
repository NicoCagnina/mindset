import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import {
  updatePsychologist,
  addPsychologist,
  getPsychologistById
} from 'redux/psychologists/thunks';
import { clearPsychologistsError, cleanSelectedItem } from 'redux/psychologists/actions';
import { Form, Field } from 'react-final-form';

function PsychologistsForm(props) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.psychologists.selectedItem);
  const error = useSelector((store) => store.psychologists.error);
  const loading = useSelector((store) => store.psychologists.isLoading);
  const history = useHistory();
  const params = useQuery();
  const psychologistId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (!props.edit) {
      if (psychologistId) {
        dispatch(getPsychologistById(psychologistId));
      }
      return () => {
        dispatch(cleanSelectedItem());
      };
    }
  }, []);

  const onSubmit = (formValues) => {
    if (!props.edit) {
      if (psychologistId) {
        dispatch(updatePsychologist(psychologistId, formValues));
      } else {
        dispatch(addPsychologist(formValues));
      }
      history.replace('/admin/psychologists/list');
    }
    dispatch(updatePsychologist(psychologistId, formValues));
  };

  const required = (value) => (value ? undefined : 'Required');
  const mustBeString = (value) => (/^[a-záéíóúñ]+$/i.test(value) ? undefined : 'Text Only');
  const mustBeAlphanumeric = (value) =>
    /^[a-z0-9áéíóúñ]+$/i.test(value) ? undefined : 'Alphanumeric Only';
  const mustBeEmail = (value) =>
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ? undefined : 'Should be a Valid Email';
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce((error, validator) => error || validator(value), undefined);
  const minLength = (value) =>
    value && value.toString().length > 7 ? undefined : 'Minimum Length is 8 characters';

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Account Info</h2>
            <div className={styles.form}>
              {loading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              {!props.edit && (
                <>
                  <label htmlFor="psychoFirstName">First Name</label>
                  <Field
                    id="psychoFirstName"
                    className={styles.input}
                    name="firstName"
                    type="text"
                    validate={composeValidators(required, mustBeString)}
                    component={Input}
                  />
                  <label htmlFor="psychoLastName">Last name</label>
                  <Field
                    id="psychoLastName"
                    className={styles.input}
                    name="lastName"
                    type="text"
                    validate={composeValidators(required, mustBeString)}
                    component={Input}
                  />
                </>
              )}
              <label htmlFor="psychoUserName">User Name</label>
              <Field
                id="psychoUserName"
                className={styles.input}
                name="userName"
                type="text"
                validate={composeValidators(required, mustBeAlphanumeric)}
                component={Input}
              />
              <label htmlFor="psychoEmail">Email</label>
              <Field
                id="psychoEmail"
                className={styles.input}
                name="email"
                placeholder="example@foo.com"
                type="email"
                validate={composeValidators(required, mustBeEmail)}
                component={Input}
              />
              <label htmlFor="psychoPassword">Password</label>
              <Field
                className={styles.input}
                name="password"
                type="password"
                validate={composeValidators(required, minLength)}
                component={Input}
              />
            </div>
            <Button
              className={styles.button}
              content={'SAVE'}
              disabled={
                loading ||
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
        closeModal={() => dispatch(clearPsychologistsError())}
        type={'Error'}
      />
    </div>
  );
}

export default PsychologistsForm;
