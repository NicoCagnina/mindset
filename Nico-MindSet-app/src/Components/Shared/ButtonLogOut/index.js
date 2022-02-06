import { useHistory } from 'react-router-dom';
import styles from './btn.module.css';
import { logOutUser } from 'helper/firebase';

const LogOutButton = () => {
  const history = useHistory();

  const logOut = () => {
    sessionStorage.removeItem('token');
    logOutUser();
    history.replace('/auth/login');
  };

  return (
    <button className={styles.button} onClick={() => logOut()}>
      Logout
    </button>
  );
};

export default LogOutButton;
