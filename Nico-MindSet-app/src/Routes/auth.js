import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Register from 'Components/Auth/Register';
import Layout from 'Components/Layout';

const authRoutes = [
  { name: 'Log In', path: '/auth/login' },
  { name: 'Register', path: '/auth/register' }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/register`} component={Register} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
