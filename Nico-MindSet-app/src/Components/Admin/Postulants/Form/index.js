import { useLocation, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import styles from './form.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getPostulantById, addPostulant, updatePostulant } from 'redux/postulants/thunks';
import { clearPostulantsError, cleanSelectedItem } from 'redux/postulants/actions';
import { Form, Field } from 'react-final-form';

function PostulantsForm(props) {
  const dispatch = useDispatch();
  const selectedItem = useSelector((store) => store.postulants.selectedItem);
  const error = useSelector((store) => store.postulants.error);
  const loading = useSelector((store) => store.postulants.isLoading);
  const history = useHistory();
  const params = useQuery();
  const postulantId = params.get('id');

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (!props.edit) {
      if (postulantId) {
        dispatch(getPostulantById(postulantId));
      }
      return () => {
        dispatch(cleanSelectedItem());
      };
    }
  }, []);

  const onSubmit = (formValues) => {
    if (!props.edit) {
      if (postulantId) {
        dispatch(updatePostulant(postulantId, formValues));
      } else {
        dispatch(addPostulant(formValues));
      }
      history.replace('/admin/postulants/list');
    }
    dispatch(updatePostulant(postulantId, formValues)).then(history.go(0));

    // console.log(props.edit);
  };

  const required = (value) => (value ? undefined : 'Required');
  const mustBeNumber = (value) => (/^\d+$/.test(value) ? undefined : 'Numbers Only');
  const mustBeStringNoSpace = (value) => (/^[a-záéíóúñ]+$/i.test(value) ? undefined : 'Text Only');
  const mustBeString = (value) =>
    /^[a-záéíóúñ_]+( [a-záéíóúñ_]+)*$/i.test(value)
      ? undefined
      : 'Text Only - Whitespaces in the middle';
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
            <h2>Personal Info</h2>
            {loading && (
              <div className={styles.spinnerContainer}>
                <LoadingSpinner />
              </div>
            )}
            <label htmlFor="postulantFirstName">First Name</label>
            <Field
              id="postulantFirstName"
              className={styles.input}
              name="firstName"
              type="text"
              validate={composeValidators(required, mustBeString)}
              component={Input}
            />
            <label htmlFor="postulantLastName">Last Name</label>
            <Field
              id="postulantLastName"
              className={styles.input}
              name="lastName"
              type="text"
              validate={composeValidators(required, mustBeStringNoSpace)}
              component={Input}
            />
            <label htmlFor="postulantUserName">User Name</label>
            <Field
              id="postulantUserName"
              className={styles.input}
              name="userName"
              type="text"
              validate={composeValidators(required, mustBeAlphanumeric)}
              component={Input}
            />
            <label htmlFor="postulantEmail">Email</label>
            <Field
              id="postulantEmail"
              className={styles.input}
              name="email"
              placeholder="example@foo.com"
              type="email"
              validate={composeValidators(required, mustBeEmail)}
              component={Input}
            />
            {!props.edit && (
              <>
                <label htmlFor="postulantPassword">Password</label>
                <Field
                  id="postulantPassword"
                  className={styles.input}
                  name="password"
                  type="password"
                  validate={composeValidators(required, minLength)}
                  component={Input}
                />
              </>
            )}
            <label htmlFor="postulantBirthDate">Birth Date</label>
            <Field
              id="postulantBirthDate"
              className={styles.input}
              name="birthDate"
              type="date"
              validate={required}
              component={Input}
            />
            <label htmlFor="postulantStreet">Street</label>
            <Field
              id="postulantStreet"
              className={styles.input}
              name="street"
              type="text"
              validate={composeValidators(required, mustBeString)}
              component={Input}
            />
            <label htmlFor="postulantStreetNumber">Street Number</label>
            <Field
              id="postulantStreetNumber"
              className={styles.input}
              name="streetNumber"
              type="number"
              min="0"
              validate={composeValidators(required, mustBeNumber)}
              component={Input}
            />
            <label htmlFor="postulantPostalCode">Postal Code</label>
            <Field
              id="postulantPostalCode"
              className={styles.input}
              name="postalCode"
              type="number"
              min="0"
              validate={composeValidators(required, mustBeNumber)}
              component={Input}
            />
            <label htmlFor="postulantCity">City</label>
            <Field
              id="postulantCity"
              className={styles.input}
              name="city"
              type="text"
              validate={composeValidators(required, mustBeString)}
              component={Input}
            />
            <label htmlFor="postulantProvince">Province</label>
            <Field
              id="postulantProvince"
              className={styles.input}
              name="province"
              type="text"
              validate={composeValidators(required, mustBeString)}
              component={Input}
            />
            <label htmlFor="postulantCountry">Country</label>
            <Field
              id="postulantCountry"
              className={styles.input}
              name="country"
              type="text"
              validate={composeValidators(required, mustBeString)}
              component={Input}
            />
            <label htmlFor="postulantTelephone">Telephone</label>
            <Field
              id="postulantTelephone"
              className={styles.input}
              name="telephone"
              type="text"
              validate={composeValidators(required, mustBeNumber, minLength)}
              component={Input}
            />
            <h2>Postulant Experience</h2>
            <div className={styles.form}>
              <label htmlFor="postulantJobPosition">Job Position</label>
              <Field
                id="postulantJobPosition"
                className={styles.input}
                name="experience[0].jobPosition"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <label htmlFor="postulantEmployer">Employer</label>
              <Field
                id="postulantEmployer"
                className={styles.input}
                name="experience[0].employer"
                type="text"
                validate={composeValidators(required, mustBeString)}
                component={Input}
              />
              <label htmlFor="postulantStartDate">Start date</label>
              <Field
                id="postulantStartDate"
                className={styles.input}
                name="experience[0].startDate"
                type="date"
                validate={required}
                component={Input}
              />
              <label htmlFor="postulantEndDate">End date</label>
              <Field
                id="postulantEndDate"
                className={styles.input}
                name="experience[0].endDate"
                type="date"
                validate={required}
                component={Input}
              />
              <label htmlFor="postulantDescription">Description</label>
              <Field
                id="postulantDescription"
                className={styles.input}
                name="experience[0].description"
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
        closeModal={() => dispatch(clearPostulantsError())}
        type={'Error'}
      />
    </div>
  );
}

export default PostulantsForm;
