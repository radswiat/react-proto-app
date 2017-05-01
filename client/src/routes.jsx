import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { routesConfig } from 'config';
import { AppContainer } from 'react-hot-loader';

// import routes pages
import App from 'components/app/app';
import PageHome from 'pages/home/home';
import PageLogin from 'pages/login/login';
import ManageCategories from 'pages/manage-categories/manage-categories';

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
            <Route path={routesConfig.manageCategories} exact component={ManageCategories} />
          </Switch>
        </App>
      </AppContainer>
    </Router>
  );
};
