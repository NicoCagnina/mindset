import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteBtn from 'Components/Shared/DeleteBtn';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteApplications } from 'redux/applications/thunks';
import { clearApplicationsError } from 'redux/applications/actions';

function Application({ application }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((store) => store.applications.error);

  const openEditForm = () => {
    history.push(`/admin/applications/form?id=${application._id}`);
  };

  return (
    <>
      <Modal
        title="Are you sure you want to delete the selected application?"
        onConfirm={(e) => {
          e.stopPropagation();
          dispatch(deleteApplications(application._id));
        }}
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
      <tr key={application._id} onClick={openEditForm}>
        <td>{`${application.positions?.job}`}</td>
        <td>{`${application.client?.customerName}`}</td>
        <td>{`${application?.postulants?.firstName}  ${application.postulants?.lastName}`}</td>
        <td>{`${application?.result}`}</td>
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

export default Application;
