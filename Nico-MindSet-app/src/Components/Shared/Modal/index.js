import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = (event) => {
    event.stopPropagation();
    props.closeModal(event);
  };

  const onConfirm = (event) => {
    event.stopPropagation();
    props.onConfirm(event);
  };

  return (
    <div className={styles.container} onClick={(e) => onCloseModal(e)}>
      <div className={styles.modal}>
        <div>
          <h2 className={styles.title}>{props.title}</h2>
          <span className={styles.subtitle}>{props.subtitle}</span>
        </div>
        {!(props.type === 'Error') ? (
          <>
            <button className={styles.confirmBtnModal} onClick={(e) => onConfirm(e)}>
              Confirm
            </button>
            <button className={styles.cancelBtnModal} onClick={(e) => onCloseModal(e)}>
              Cancel
            </button>
          </>
        ) : (
          <button className={styles.backBtnModal} onClick={(e) => onCloseModal(e)}>
            Go back
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;
