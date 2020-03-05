import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { StoreState } from './types';

const store = createStore<StoreState>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});

ReactDOM.render(
    <Provider store={store}>
        <Hello />
    </Provider>,
    document.getElementById('root') as HTMLElement
);