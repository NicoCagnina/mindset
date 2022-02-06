import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { getClientById, addClient, updateClient } from 'redux/clients/thunks';
import { clearClientsError, cleanSelectedItem } from 'redux/clients/actions';
import { Form, Field } from 'react-final-form';

function ClientsForm() {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.clients.selectedItem);
  const error = useSelector((store) => store.clients.error);
  const loading = useSelector((store) => store.clients.isLoading);
  const history = useHistory();
  const params = useQuery();
  const clientId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (clientId) {
      dispatch(getClientById(clientId));
    }
    return () => {
      dispatch(cleanSelectedItem());
    };
  }, []);

  const onSubmit = (formValues) => {
    if (clientId) {
      dispatch(updateClient(clientId, formValues));
    } else {
      dispatch(addClient(formValues));
    }
    history.replace('/admin/clients/list');
  };

  const required = (value) => (value ? undefined : 'Required');
  const mustBeString = (value) =>
    /^[a-záéíóúñ_]+( [a-záéíóúñ_]+)*$/i.test(value)
      ? undefined
      : 'Text Only - Whitespaces in the middle';
  const mustBeNumber = (value) => (/^\d+$/.test(value) ? undefined : 'Numbers Only');
  const mustBeEmail = (value) =>
    /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ? undefined : 'Should be a Valid Email';
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce((error, validator) => error || validator(value), undefined);
  const minLength = (value) => {
    value && value.toString().length > 7 ? undefined : 'Minimum Length is 8 characters';
  };

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <h2>Form</h2>
            <div className={styles.form}>
              {loading && (
                <div className={styles.spinnerContainer}>
                  <LoadingSpinner />
                </div>
              )}
              <Field
                className={styles.input}
                name="customerName"
                placeholder="Customer's Name"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="branch"
                placeholder="Branchs's Name"
                type="text"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.input}
                name="phone"
                placeholder="Customer's Phone"
                type="text"
                validate={composeValidators(required, mustBeNumber, minLength)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="email"
                placeholder="Customer's Email"
                type="email"
                validate={composeValidators(required, mustBeEmail)}
                component={Input}
              />
              <Field
                className={styles.input}
                name="description"
                placeholder="Customer's Description"
                type="text"
                validate={required}
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
        closeModal={() => dispatch(clearClientsError())}
        type={'Error'}
      />
    </div>
  );
}

export default ClientsForm;
