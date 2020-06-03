import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { LinksPage } from './pages/LinksPage';
import { CreateLinkPage } from './pages/CreateLinkPage';
import { LinkDetailPage } from './pages/LinkDetailPage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage></LinksPage>
        </Route>
        <Route path="/create" exact>
          <CreateLinkPage></CreateLinkPage>
        </Route>
        <Route path="/detail/:id">
          <LinkDetailPage></LinkDetailPage>
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage></AuthPage>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
