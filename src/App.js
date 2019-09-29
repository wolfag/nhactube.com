import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { loadable } from './utils';
import GlobalStyle from './global-styles';
import Layout from './layout';

const HomePage = loadable(() => import('./pages/HomePage'));

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={HomePage} />
        </Switch>
        <GlobalStyle />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
