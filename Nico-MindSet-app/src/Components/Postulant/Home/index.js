import styles from './home.module.css';
import PostulantHome from 'Components/Postulant/Home/postulantHome';

function Home() {
  return (
    <section className={styles.container}>
      <PostulantHome />
    </section>
  );
}

export default Home;
