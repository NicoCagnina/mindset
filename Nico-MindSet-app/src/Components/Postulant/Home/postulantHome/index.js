import styles from './postulantHome.module.css';
import Modal from 'Components/Shared/Modal';
import InputModal from 'Components/Shared/InputModal';
import ToggleSwitch from 'Components/Shared/ToggleSwitch';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import React, { useEffect, useState, useRef } from 'react';
import { getPostulantById, updatePostulant } from 'redux/postulants/thunks';
import { getSessions } from 'redux/sessions/thunks';
import { getInterviews } from 'redux/interviews/thunks';
import { deleteInterviews } from 'redux/interviews/thunks';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function PostulantHome() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState('');
  const [availableValue, setAvailableValue] = useState(true);
  const sessions = useSelector((store) => store.sessions.list);
  const interviews = useSelector((store) => store.interviews.list);
  const postulant = useSelector((store) => store.postulants.selectedItem);
  const loading = {
    sessionsLoading: useSelector((store) => store.sessions.isLoading),
    interviewsLoading: useSelector((store) => store.interviews.isLoading),
    postulantLoading: useSelector((store) => store.postulants.isLoading)
  };

  const dispatch = useDispatch();
  const params = useQuery();
  const postulantId = params.get('id');
  const firstUpdate = useRef(true);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    dispatch(getPostulantById(postulantId));
  }, []);

  useEffect(() => {
    if (postulant) {
      setAvailableValue(postulant.availability);
    }
  }, [postulant?.availability]);

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);

  useEffect(() => {
    if (firstUpdate.current) return (firstUpdate.current = false);
    if (postulant) {
      dispatch(
        updatePostulant(postulantId, {
          availability: availableValue
        })
      );
    }
  }, [availableValue]);

  const EditBtn = () => {
    //history.push(`/admin/postulants/form?id=${postulantId}`);
    setShowInputModal(true);
  };

  const changeAvailability = () => {
    setAvailableValue(!availableValue);
  };

  const cancelInterview = () => {
    dispatch(deleteInterviews(selectedInterview));
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected interview?"
        onConfirm={(e) => {
          e.stopPropagation();
          cancelInterview();
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <InputModal
        title="Edit your data"
        onConfirm={(e) => {
          e.stopPropagation();
          console.log('llego al confirm');
        }}
        show={showInputModal}
        type={'postulant'}
        closeModal={() => setShowInputModal(false)}
      />
      <section className={styles.container}>
        <div className={styles.userInfoContainer}>
          <div className={styles.imgContainer}>
            <img
              className={styles.userImg}
              id="userImg"
              src="https://pbs.twimg.com/profile_images/1198892618429739008/hcHxthRT_400x400.jpg"
              alt="exampleAvatar"
            ></img>
          </div>
          {loading.postulantLoading && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
            </div>
          )}
          <h2 className={styles.userName}>
            {postulant?.firstName || '-'} {postulant?.lastName || '-'}
          </h2>
          <div className={styles.prof}>
            {!loading.postulantLoading && !postulant?.profiles?.length ? (
              <h3 className={styles.nothingHere}>This profile has not been analyzed yet!</h3>
            ) : (
              <>
                {postulant?.profiles?.map((profile) => {
                  return (
                    <span className={styles.userInfo} key={profile.profile.profileName}>
                      -{`${profile.profile.profileName}`}
                    </span>
                  );
                })}
              </>
            )}
          </div>
          <h2 className={styles.userInfo}>
            {postulant?.city}, {postulant?.province} - {postulant?.country}
          </h2>
          <div className={styles.toggleSwitch}>
            <ToggleSwitch
              label="Available"
              toggled={postulant?.availability}
              onClick={changeAvailability}
              className={styles.toggled}
              disabled={loading.postulantLoading}
            />
          </div>
          <div className={styles.btnContainer}>
            <button onClick={EditBtn} className={styles.btn}>
              edit
            </button>
          </div>
        </div>
        {postulant.profiles?.length <= 0 ? (
          <div className={styles.divContainer}>
            <div className={styles.cardsInfoContainer}>
              <h2 className={styles.cardsInfoTitle}>available sessions</h2>
              <div className={styles.sessionsDiv}>
                {loading.sessionsLoading && (
                  <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                  </div>
                )}
                {!loading && !interviews.length && (
                  <h3 className={styles.nothingHere}>No sessions available!</h3>
                )}
                {sessions.map((session, i) => {
                  const sessionDate = new Date(session.date);
                  const formattedSessionsDate = sessionDate.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  });
                  return (
                    <div key={i} className={styles.cardsInfo}>
                      <h3>{`${formattedSessionsDate} at ${session.time}`}</h3>
                      <button>take</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.divContainer}>
            <div className={styles.cardsInfoContainer}>
              <h2 className={styles.cardsInfoTitle}>JOB INTERVIEWS</h2>
              <div>
                {loading.interviewsLoading && (
                  <div className={styles.spinnerContainer}>
                    <LoadingSpinner />
                  </div>
                )}
                {!loading && !interviews.length && (
                  <h3 className={styles.nothingHere}>No interviews yet!</h3>
                )}
                {interviews.map((interview, i) => {
                  return (
                    <div key={i} className={styles.cardsInfo}>
                      <h3>{`${interview.dateTime} ${interview.status}`}</h3>
                      {interview.status === 'pending' && (
                        <button
                          className={styles.sessionsBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInterview(interview._id);
                            setShowConfirmModal(true);
                          }}
                        >
                          CANCEL
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default PostulantHome;
