import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../Modules/Auth/Services/AuthService';

// Layout
import DashboardLayout from '../Layout/DashboardLayout';

// Routes
import DashboardRoutes from '../Modules/Dashboard/DashboardRoutes';
import AbsensiRoutes from '../Modules/Absensi/AbsensiRoutes';

import Loadable from 'react-loadable';
import PageLoader from '../Components/PageLoader';

const Login = Loadable({
  loader: () => import('../Modules/Auth/Components/Login'),
  loading: PageLoader,
});

const PrivateRoute = ({ children: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />

        <Route path='/dashboard'>
          <DashboardLayout>
            <Switch>
              {DashboardRoutes.map((route, index) => (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={route.component}
                />
              ))}
            </Switch>
          </DashboardLayout>
        </Route>

        <Route>
          <Switch>
            {AbsensiRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={route.component}
              />
            ))}
          </Switch>
        </Route>

      </Switch>
    </Router>
  )
}