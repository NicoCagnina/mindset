import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import styles from './admin.module.css';
import DeleteBtn from 'Components/Shared/DeleteBtn';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdmin } from 'redux/admins/thunks';
import { cleanError } from 'redux/admins/actions';

function Admin({ admin }) {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const error = useSelector((store) => store.admins.error);
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admin/admins/form?id=${admin._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete an Admin?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteAdmin(admin._id));
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => cleanError()}
        type={'Error'}
      />
      <tr className={styles.tr} key={admin._id} onClick={openEditForm}>
        <td>{admin.username}</td>
        <td>{admin.firstName}</td>
        <td>{admin.lastName}</td>
        <td>{admin.email}</td>
        <td>{admin.password}</td>
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

export default Admin;
