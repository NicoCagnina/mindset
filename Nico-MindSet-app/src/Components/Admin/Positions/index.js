import styles from './positions.module.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Position from './Position';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getPositions } from 'redux/positions/thunks';
import { clearPositionsError } from 'redux/positions/actions';

function Positions() {
  const dispatch = useDispatch();
  const positions = useSelector((store) => store.positions.list);
  const loading = useSelector((store) => store.positions.isLoading);
  const error = useSelector((store) => store.positions.error);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  const CreateBtn = () => {
    history.push(`/admin/positions/form`);
  };

  return (
    <section className={styles.container}>
      <h2>Positions</h2>
      <div className={styles.list}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>Client Id</th>
              <th>Job</th>
              <th>Description</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {positions.map((position) => {
                return <Position key={position._id} position={position} />;
              })}
            </tbody>
          )}
        </table>
        {loading && <LoadingSpinner circle={false} />}
        {!loading && !positions.length && (
          <h3 className={styles.nothingHere}>Oops... Nothing Here</h3>
        )}
        <Button className={styles.button} onClick={CreateBtn} content={'CREATE POSITION'} />
      </div>
      <Modal
        title="Are you sure you want to delete the selected Position?"
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPositionsError())}
        type={'Error'}
      />
    </section>
  );
}

export default Positions;
