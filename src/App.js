import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import history from './helpers/m-history'
import { Provider } from "react-redux";
import {LoginScreen} from './views/login'
// Containers
import { DefaultLayout } from "./containers";
import './App.scss';

function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={LoginScreen}/>
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
