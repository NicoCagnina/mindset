import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteBtn from 'Components/Shared/DeleteBtn';
import Modal from 'Components/Shared/Modal';
import { deletePosition } from 'redux/positions/thunks';
import { clearPositionsError } from 'redux/positions/actions';

function Position({ position }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const error = useSelector((store) => store.positions.error);
  const history = useHistory();
  const dispatch = useDispatch();
  const createdDate = new Date(position.createdAt);

  const openEditForm = () => {
    history.push(`/admin/positions/form?id=${position._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected position?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deletePosition(position._id));
        }}
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
      <tr key={position._id} onClick={openEditForm}>
        <td>{position.clientId.customerName}</td>
        <td>{position.job}</td>
        <td>{position.description}</td>
        <td>{createdDate.toLocaleDateString()}</td>
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

export default Position;
