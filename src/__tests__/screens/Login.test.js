import React from 'react';
import ReactDOM from 'react-dom';
import { LoginScreen } from '../../views/login';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
const mockStore = configureStore()
let store

beforeEach(() => {
  store = mockStore({ userReducer: {}, truckReducer: {} })
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><LoginScreen /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
