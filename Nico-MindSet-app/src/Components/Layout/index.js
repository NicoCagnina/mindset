import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import styles from './layout.module.css';

const Layout = (props) => {
  const { routes = [] } = props;
  return (
    <div className={styles.container}>
      <Header routes={routes} authenticated={props.authenticated} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
