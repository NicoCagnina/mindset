import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteBtn from 'Components/Shared/DeleteBtn';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSession } from 'redux/sessions/thunks';
import { clearSessionsError } from 'redux/sessions/actions';

function Session({ session }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const error = useSelector((store) => store.positions.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admin/sessions/form?id=${session._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected session?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteSession(session._id));
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearSessionsError())}
        type={'Error'}
      />
      <tr key={session._id} onClick={openEditForm}>
        <td>{`${session?.psychology?.firstName} ${session?.psychology?.lastName}`}</td>
        <td>{`${session?.postulant?.firstName} ${session?.postulant?.lastName}`}</td>
        <td>{session.time}</td>
        <td>{session.date}</td>
        <td>{session.status}</td>
        <td>
          <DeleteBtn
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
          />
        </td>
      </tr>
    </>
  );
}

export default Session;
