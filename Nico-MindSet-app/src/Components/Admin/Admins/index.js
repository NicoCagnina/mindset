import { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './admins.module.css';
import Admin from './Admin';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import { useSelector, useDispatch } from 'react-redux';
import { getAdmins } from 'redux/admins/thunks';
import { cleanError } from 'redux/admins/actions';

function Admins() {
  const history = useHistory();
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.admins.list);
  const loading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const CreateBtn = () => {
    history.push(`/admin/admins/form`);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Admins</h2>
        <div>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {admins.map((admin) => {
                  return <Admin key={admin._id} admin={admin} />;
                })}
              </tbody>
            )}
          </table>
          {loading && <LoadingSpinner circle={false} />}
          {!loading && !admins.length && (
            <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
          )}
          <Button className={styles.button} onClick={CreateBtn} content={'CREATE ADMIN'} />
        </div>
      </section>
      <section className={styles.createBtnSection}>
        {error && <div className={styles.error}>{error}</div>}
      </section>
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(cleanError())}
        type={'Error'}
      />
    </>
  );
}

export default Admins;
