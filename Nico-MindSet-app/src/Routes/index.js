import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const PsychologistRoutes = lazy(() => import('Routes/psychologist'));
const AuthRoutes = lazy(() => import('Routes/auth'));
const HomeRoutes = lazy(() => import('Routes/homePage'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/postulant" exact component={PostulantRoutes} />
          <Route path="/psychologists" exact component={PsychologistRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Route path="/" component={HomeRoutes} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
