import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Postulant from './Postulant';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import styles from './postulants.module.css';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { getPostulants } from 'redux/postulants/thunks';
import { clearPostulantsError } from 'redux/postulants/actions';

function Postulants() {
  const history = useHistory();
  const dispatch = useDispatch();
  const postulants = useSelector((store) => store.postulants.list);
  const error = useSelector((store) => store.postulants.error);
  const loading = useSelector((store) => store.postulants.isLoading);

  useEffect(() => {
    dispatch(getPostulants());
  }, []);

  const CreateBtn = () => {
    history.push(`/admin/postulants/form`);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Postulants</h2>
        <div>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Phone</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {postulants.map((postulant) => {
                  return <Postulant key={postulant._id} postulant={postulant} />;
                })}
              </tbody>
            )}
          </table>
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !postulants.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
          <Button className={styles.button} onClick={CreateBtn} content={'CREATE POSTULANT'} />
        </div>
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
      </section>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPostulantsError())}
        type={'Error'}
      />
    </>
  );
}

export default Postulants;
