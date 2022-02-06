import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Interview from './Interview/index';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import styles from './interviews.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviews } from 'redux/interviews/thunks';
import { clearInterviewsError } from 'redux/interviews/actions';

function Interviews() {
  const history = useHistory();
  const dispatch = useDispatch();
  const interviews = useSelector((store) => store.interviews.list);
  const loading = useSelector((store) => store.interviews.isLoading);
  const error = useSelector((store) => store.interviews.error);

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);

  const CreateBtn = () => {
    history.push(`/admin/interviews/form`);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Interviews</h2>
        <div>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Position</th>
                <th>Postulant</th>
                <th>Date Time</th>
                <th></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {interviews.map((interview) => {
                  return <Interview key={interview._id} interview={interview} />;
                })}
              </tbody>
            )}
          </table>
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !interviews.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
          <Button className={styles.button} onClick={CreateBtn} content={'CREATE INTERVIEW'} />
        </div>
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
      </section>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearInterviewsError())}
        type={'Error'}
      />
    </>
  );
}

export default Interviews;
