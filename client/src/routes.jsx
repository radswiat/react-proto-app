import React from 'react';
import { Switch, Route, Router } from 'react-router';
import { routesConfig } from 'config';
import { AppContainer } from 'react-hot-loader';

// import routes pages
import App from 'components/app/app';
import PageHome from 'pages/home/home';
import PageLogin from 'pages/login/login';
import Page404 from 'pages/404/404';

/**
 * Define react routes
 * - every route has an corresponding file in client/pages
 *   which specifies components or/and modules
 * - one exception is App which is a parent for every single route
 * @returns {XML}
 */
export default (history) => {
  return (
    <Router history={history}>
      <AppContainer>
        <App>
          <Switch>
            <Route path={routesConfig.home} exact component={PageHome} />
            <Route path={routesConfig.login} exact component={PageLogin} />
          </Switch>
        </App>
      </AppContainer>
    </Router>
  );
};
