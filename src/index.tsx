import { createStore, Action } from 'redux';
import { enthusiasm } from './reducers/index';
import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { StoreState } from './types';

const store = createStore<StoreState | undefined, Action<any>, unknown, unknown>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'I\'m fluent in Math and Klingon',
  });

ReactDOM.render(
    <Provider store={store}>
        <Hello />
    </Provider>,
    document.getElementById('root') as HTMLElement
);