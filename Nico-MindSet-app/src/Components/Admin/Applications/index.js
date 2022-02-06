import styles from './applications.module.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Application from './Application';
import Modal from 'Components/Shared/Modal';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from 'redux/applications/thunks';
import { clearApplicationsError } from 'redux/applications/actions';

function Applications() {
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications.list);
  const loading = useSelector((store) => store.applications.isLoading);
  const error = useSelector((store) => store.applications.error);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const CreateBtn = () => {
    history.push(`/admin/applications/form`);
  };
  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <div className={styles.list}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Client</th>
              <th>Postulant</th>
              <th>Result</th>
              <th></th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {applications.map((application) => {
                return <Application key={application._id} application={application} />;
              })}
            </tbody>
          )}
        </table>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !applications.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
        <Button className={styles.button} onClick={CreateBtn} content={'CREATE APPLICATION'} />
      </div>
      <Modal
        title="Are you sure you want to delete the selected Application?"
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearApplicationsError())}
        type={'Error'}
      />
    </section>
  );
}

export default Applications;
