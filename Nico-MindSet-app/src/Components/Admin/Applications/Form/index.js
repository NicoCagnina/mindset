import styles from './form.module.css';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import {
  addApplications,
  updateApplications,
  getApplicationsById,
  getApplicationsOptions
} from 'redux/applications/thunks';
import { Form, Field } from 'react-final-form';
import { clearApplicationsError, cleanSelectedApplications } from 'redux/applications/actions';

function AppForm() {
  const history = useHistory();
  const params = useQuery();
  const applicationId = params.get('id');
  const dispatch = useDispatch();
  const error = useSelector((store) => store.applications.error);
  const loading = useSelector((store) => store.applications.isLoading);
  const selectedItem = useSelector((store) => store.applications.selectedItem);
  const options = useSelector((store) => store.applications.options);

  useEffect(() => {
    if (applicationId) {
      dispatch(getApplicationsById(applicationId));
    }
    dispatch(getApplicationsOptions('positions'));
    dispatch(getApplicationsOptions('postulants'));
    dispatch(getApplicationsOptions('clients'));
  }, [dispatch]);

  useEffect(() => {
    if (applicationId) {
      dispatch(getApplicationsById(applicationId));
    } else {
      dispatch(cleanSelectedApplications());
    }
  }, []);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onSubmit = (formValues) => {
    if (applicationId) {
      dispatch(updateApplications(applicationId, formValues));
    } else {
      dispatch(addApplications(formValues));
    }
    history.push('/admin/applications/list');
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <>
      <div className={styles.container}>
        <Form
          onSubmit={onSubmit}
          initialValues={selectedItem}
          render={(formProps) => (
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <h2>Form</h2>
              <div className={styles.form}>
                <Modal
                  title="Something went wrong!"
                  subtitle={error}
                  show={error}
                  closeModal={() => dispatch(clearApplicationsError())}
                  type={'Error'}
                />
                <h3 className={error ? styles.error : ''}>{error}</h3>
                {Object.values(loading).some(Boolean) && (
                  <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                  </div>
                )}
                <Field
                  className={styles.select}
                  label="Position:"
                  id="positions-select"
                  name="positions"
                  options={options.positions}
                  component={Select}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  label="Client:"
                  id="client-select"
                  name="client"
                  options={options.clients}
                  component={Select}
                  validate={required}
                />
                <Field
                  className={styles.select}
                  label="Postulant:"
                  id="postulants-select"
                  name="postulants"
                  options={options.postulants}
                  component={Select}
                  validate={required}
                />
                <Field
                  className={styles.input}
                  placeholder="Result"
                  label="Result:"
                  id="result-input"
                  name="result"
                  component={Input}
                  validate={required}
                />
              </div>
              <Button
                className={styles.button}
                content={applicationId ? 'Update Application' : 'Create Application'}
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
      </div>
    </>
  );
}

export default AppForm;
