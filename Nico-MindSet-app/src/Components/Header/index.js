import styles from './header.module.css';
import { Link } from 'react-router-dom';
import LogOutButton from 'Components/Shared/ButtonLogOut';

function Header(props) {
  return (
    <header>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.appName}>
          Mind<span className={styles.nameColor}>SET</span>
        </Link>
        <ul className={styles.routes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
        {props.authenticated && <LogOutButton />}
      </nav>
    </header>
  );
}

export default Header;
