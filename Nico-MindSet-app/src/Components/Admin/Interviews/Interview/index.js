import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './interview.module.css';
import DeleteBtn from 'Components/Shared/DeleteBtn/index';
import Modal from 'Components/Shared/Modal';
import { useDispatch } from 'react-redux';
import { deleteInterviews } from 'redux/interviews/thunks';

const Interview = ({ interview }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admin/interviews/form?id=${interview._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete this Interview?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteInterviews(interview._id));
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => setError('')}
        type={'Error'}
      />
      <tr className={styles.tr} key={interview._id} onClick={openEditForm}>
        <td>{`${interview?.positionId?.job}`}</td>
        <td>{`${interview?.postulantId?.firstName} ${interview?.postulantId?.lastName}`}</td>
        <td>{interview.dateTime}</td>
        <td>
          <DeleteBtn
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
          />
        </td>
      </tr>
    </>
  );
};

export default Interview;
