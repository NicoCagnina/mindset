import styles from './AdminHeader.module.css';
import LogOutButton from 'Components/Shared/ButtonLogOut';

function AdminHeader(props) {
  return (
    <header>
      <nav className={styles.container}>
        <div className={styles.titles}>
          <h1 className={styles.title}>ADMINS</h1>
        </div>
        {props.authenticated && <LogOutButton className={styles.logOutButton} />}
      </nav>
    </header>
  );
}

export default AdminHeader;
