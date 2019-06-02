import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createStore from "./store";

const store = createStore(window.__INITIAL_STATE__);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
