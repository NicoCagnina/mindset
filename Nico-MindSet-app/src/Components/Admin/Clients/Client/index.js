import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import styles from './client.module.css';
import DeleteBtn from 'Components/Shared/DeleteBtn/index';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient } from 'redux/clients/thunks';
import { clearClientsError } from 'redux/clients/actions';

const Client = ({ client }) => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const error = useSelector((store) => store.clients.error);
  const history = useHistory();

  const openEditForm = () => {
    history.push(`/admin/clients/form?id=${client._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete a Client?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteClient(client._id));
        }}
        show={showConfirmModal}
        closeModal={() => setShowConfirmModal(false)}
        type={'Confirm'}
      />
      <Modal
        title="Something went wrong!"
        subtitle={error}
        show={error}
        closeModal={() => dispatch(clearClientsError())}
        type={'Error'}
      />
      <tr className={styles.tr} key={client._id} onClick={openEditForm}>
        <td className={styles.td}>{client.customerName}</td>
        <td className={styles.td}>{client.phone}</td>
        <td className={styles.td}>{client.branch}</td>
        <td className={styles.td}>
          <DeleteBtn
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmModal(true);
            }}
            client={client}
          />
        </td>
      </tr>
    </>
  );
};

export default Client;
