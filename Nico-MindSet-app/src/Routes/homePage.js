import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import { tokenListener } from 'helper/firebase';
import Home from 'Components/HomePage';
import Layout from 'Components/Layout';

const routes = [
  { name: 'Log In', path: '/auth/login' },
  { name: 'Register', path: '/auth/register' }
];

const HomePageRoutes = () => {
  const { url } = useRouteMatch();
  useEffect(() => {
    tokenListener();
  }, []);
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default HomePageRoutes;
