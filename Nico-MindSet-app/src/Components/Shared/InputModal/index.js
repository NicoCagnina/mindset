import styles from './inputModal.module.css';
import React, { useState } from 'react';
import Button from '../Button';
import Select from 'Components/Shared/Select';
import PostulantForm from 'Components/Admin/Postulants/Form';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import { deleteSession } from 'redux/sessions/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';

function InputModal(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = props.session;
  const postulant = props.session?.postulant;
  const [showConfirmButtons, setShowConfirmButtons] = useState(false);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading),
    postulantsLoading: useSelector((store) => store.postulants.isLoading)
  };
  const selectedItem = useSelector((store) => store.sessions.selectedItem);
  //const options = useSelector((store) => store.profiles.list);

  if (!props.show) {
    return null;
  }

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal(event);
  };

  const checkPostulantStudies = () => {
    let endDate = new Date();
    // return postulant?.studies?.universitaryStudies.institute.at(-1);
    if (postulant?.studies?.universityStudies.length > 0) {
      endDate = new Date(postulant?.studies?.universityStudies.at(-1).endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent university title:</h2>
          <span>{postulant?.studies?.universityStudies.at(-1).description}</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.universityStudies.at(-1).institute}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    } else if (postulant?.studies?.tertiaryStudies.length > 0) {
      endDate = new Date(postulant?.studies?.tertiaryStudies.at(-1).endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent tertiary title:</h2>
          <span>{postulant?.studies?.tertiaryStudies.at(-1).description}</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.tertiaryStudies.at(-1).institute}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    } else if (postulant?.studies?.informalStudies.length > 0) {
      endDate = new Date(postulant?.studies?.informalStudies.at(-1).endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent studies:</h2>
          <span>{postulant?.studies?.informalStudies.at(-1).description}</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.informalStudies.at(-1).institute}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    } else {
      endDate = new Date(postulant?.studies?.secondaryStudies.endDate);
      return (
        <div className={styles.schoolContainer}>
          <h2>Most recent school title:</h2>
          <span>Highschool</span>
          <h2>From:</h2>
          <span>{postulant?.studies?.secondaryStudies.school}</span>
          <h2>Finishing year:</h2>
          <span>{endDate.toLocaleDateString()}</span>
        </div>
      );
    }
  };

  const onSubmit = (formValues) => {
    /* if (sessionId) {
      dispatch(updateSession(sessionId, formValues));
    } else {
      dispatch(addSession(formValues));
    }
    history.replace('/admin/sessions/list');*/
  };

  const setModalContent = (type) => {
    if (type) {
      switch (type) {
        case 'postulant':
          return <PostulantForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'psychologist':
          return <PsychologistsForm edit={true} closeModal={(e) => onCloseModal(e)} />;
        case 'postulantProfile':
          return (
            <>
              <div className={styles.postulantContainer}>
                <div className={styles.leftSideContainer}>
                  <img src="https://pbs.twimg.com/profile_images/1198892618429739008/hcHxthRT_400x400.jpg" />
                  <h2>
                    {postulant?.firstName} {postulant?.lastName}
                  </h2>
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
                          label="Add a new Profile: "
                          name="profiles"
                          id="profiles"
                          options={props.profiles}
                        />
                        <Button
                          className={styles.button}
                          type="submit"
                          content={'Add profile'}
                          disabled={
                            loading.postulantsLoading ||
                            loading.sessionsLoading ||
                            loading.profilesLoading ||
                            formProps.submitting ||
                            formProps.pristine ||
                            formProps.hasValidationErrors
                          }
                        />
                      </form>
                    )}
                  />
                  <span>{postulant?.profile}</span>
                </div>
                <div className={styles.rightSideContainer}>
                  <span>{checkPostulantStudies()}</span>
                  <div className={styles.sessionsDiv}>
                    <span>Session date:</span>
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                    <span>at {session.time}</span>
                    <Button
                      content="Cancel session"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirmButtons(true);
                      }}
                    />
                    {showConfirmButtons && (
                      <div className={styles.confirmCancel}>
                        <span>Are you sure?</span>
                        <div className={styles.confirmBtns}>
                          <button
                            className={styles.btnYes}
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelSession();
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className={styles.btnNo}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowConfirmButtons(false);
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
      }
    }
  };

  const cancelSession = () => {
    dispatch(deleteSession(session._id));
    history.go(0);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal}>
          <div className={styles.title}>
            <span className={styles.closeBtn} onClick={(e) => onCloseModal(e)}>
              X
            </span>
            <h2>{props.title}</h2>
            <span className={styles.subtitle}>{props.subtitle}</span>
          </div>
          <div className={styles.modalBody}>{setModalContent(props.type)}</div>
        </div>
      </div>
    </>
  );
}

export default InputModal;
