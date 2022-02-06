import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import Select from 'Components/Shared/Select';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addInterviews, updateInterviews, getInterviewById } from 'redux/interviews/thunks';
import { clearInterviewsError, cleanSelectedItem } from 'redux/interviews/actions';
import { Form, Field } from 'react-final-form';

function InterviewsForm() {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.interviews.selectedItem);
  const loading = useSelector((store) => store.interviews.isLoading);
  const error = useSelector((store) => store.interviews.error);
  const history = useHistory();
  const params = useQuery();
  const interviewId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (interviewId) {
      dispatch(getInterviewById(interviewId));
    } else {
      dispatch(cleanSelectedItem());
    }
  }, []);

  const onSubmit = (formValues) => {
    if (interviewId) {
      dispatch(updateInterviews(interviewId, formValues));
    } else {
      dispatch(addInterviews(formValues));
    }
    history.replace('/admin/interviews/list');
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <div className={styles.container}>
      <Form
        onSubmit={onSubmit}
        initialValues={selectedItem[0]}
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
                name="positionId"
                id="Position-Id"
                placeholder="Position's Id"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.input}
                name="postulantId"
                id="Postulant-Id"
                placeholder="Postulant's Id"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.input}
                name="dateTime"
                id="date-time"
                placeholder="DD/MM/YYYY HH:MM"
                validate={required}
                component={Input}
              />
              <Field
                className={styles.select}
                name="status"
                id="status"
                component={Select}
                validate={required}
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'cancelled', label: 'Cancelled' },
                  { value: 'next step', label: 'Next Step' },
                  { value: 'finished', label: 'Finished' }
                ]}
              />
            </div>
            <Button
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
        closeModal={() => dispatch(clearInterviewsError())}
        type={'Error'}
      />
      {loading && (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default InterviewsForm;
