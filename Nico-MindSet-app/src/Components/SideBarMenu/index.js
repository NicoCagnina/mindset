import styles from './SideBarMenu.module.css';
import { Link } from 'react-router-dom';

function SideBarMenu(props) {
  return (
    <aside>
      <div className={styles.wrapper}>
        <div className={styles.sideBar}>
          <div className={styles.appName}>
            Mind<span className={styles.nameColor}>SET</span>
          </div>
          <ul className={styles.routes}>
            {props.routes.map((route) => (
              <li key={route.name}>
                <a>
                  <Link to={route.path}>{route.name}</Link>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBarMenu;
