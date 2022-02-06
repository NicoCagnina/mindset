import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import styles from './adminsForm.module.css';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin, updateAdmin, getAdminById } from 'redux/admins/thunks';
import { cleanError, cleanSelectedItem } from 'redux/admins/actions';
import { Form, Field } from 'react-final-form';

function AdminsForm() {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.admins.selectedItem);
  const loading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);
  const history = useHistory();
  const params = useQuery();
  const adminId = params.get('id');

  useEffect(() => {
    if (adminId) {
      dispatch(getAdminById(adminId));
    } else {
      dispatch(cleanSelectedItem());
    }
  }, []);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (formValues) => {
    if (adminId) {
      dispatch(updateAdmin(adminId, formValues));
    } else {
      dispatch(addAdmin(formValues));
    }
    history.push('/admin/admins/list');
  };

  const required = (value) => (value ? undefined : 'Required');
  const mustBeString = (value) => (/^[a-záéíóúñ]+$/i.test(value) ? undefined : 'Text Only');
  const mustBeAlphanumeric = (value) =>
    /^[a-z0-9]+$/i.test(value) ? undefined : 'Alphanumeric Only';
  const mustBeEmail = (value) =>
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ? undefined : 'Should be a Valid Email';
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce((error, validator) => error || validator(value), undefined);
  const minLenght = (value) => (value ? value.length < 8 : 'Minimal Length is 8 characters');

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Admins</h2>
            <div className={styles.form}>
              {loading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              <Field
                className={styles.input}
                name="firstName"
                placeholder="First name"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="lastName"
                placeholder="Last name"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="username"
                placeholder="Username"
                type="text"
                validate={composeValidators(required, mustBeAlphanumeric)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="email"
                placeholder="example@foo.com"
                type="email"
                validate={composeValidators(required, mustBeEmail)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="password"
                placeholder="Password"
                type="password"
                validate={composeValidators(required, minLenght)}
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
        closeModal={() => cleanError()}
        type={'Error'}
      />
    </div>
  );
}
export default AdminsForm;
