import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteBtn from 'Components/Shared/DeleteBtn';
import Modal from 'Components/Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { deletePsychologist } from 'redux/psychologists/thunks';
import { clearPsychologistsError } from 'redux/psychologists/actions';

function Psychologist({ psychologist }) {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.psychologists.error);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admin/psychologists/form?id=${psychologist._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected psychologist?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deletePsychologist(psychologist._id));
          setShowConfirmModal(false);
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearPsychologistsError())}
        type={'Error'}
      />
      <tr key={psychologist._id} onClick={openEditForm}>
        <td>{psychologist.userName}</td>
        <td>{psychologist.firstName}</td>
        <td>{psychologist.lastName}</td>
        <td>{psychologist.email}</td>
        <td>{psychologist.password}</td>
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

export default Psychologist;
