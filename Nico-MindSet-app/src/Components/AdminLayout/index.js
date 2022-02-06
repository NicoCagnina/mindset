import AdminHeader from 'Components/AdminHeader/index';
import Footer from 'Components/Footer/index';
import styles from './adminLayout.module.css';
import SideBarMenu from 'Components/SideBarMenu';

const AdminLayout = (props) => {
  const { routes = [] } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <AdminHeader routes={routes} authenticated={props.authenticated} />
        </div>
        <div className={styles.sideBar}>
          <div className={styles.content}>{props.children}</div>
          <SideBarMenu routes={routes} authenticated={props.authenticated} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
