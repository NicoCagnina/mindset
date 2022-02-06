import { useHistory } from 'react-router-dom';
import styles from './homePage.module.css';
import { useEffect } from 'react';
import Button from 'Components/Shared/Button';
import { getPositions } from 'redux/positions/thunks';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from 'Components/Shared/LoadingSpinner';

function HomePage() {
  const history = useHistory();
  const jobs = useSelector((store) => store.positions.list);
  const loading = useSelector((store) => store.positions.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);
  return (
    <>
      {loading && (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.jobsContainer}>
          {jobs.map((job) => {
            return (
              <div className={styles.divContainer} key={job._id}>
                <h2>{job.clientId.customerName}</h2>
                <img src="https://picsum.photos/300/200" />
                <h3>{job.job}</h3>
                <Button
                  content={'apply'}
                  onClick={() => {
                    history.push('/auth/register');
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
