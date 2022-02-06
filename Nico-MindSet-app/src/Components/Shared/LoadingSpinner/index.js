import styles from './loadingspinner.module.css';

const LoadingSpinner = ({ circle = true }) => {
  const circleSpinner = (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  const horizontalSpinner = (
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return <div className={styles.container}>{circle ? circleSpinner : horizontalSpinner}</div>;
};

export default LoadingSpinner;
