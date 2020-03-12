import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { AUTHOR } from './components/model/Author';

ReactDOM.render(
    <App author={AUTHOR} />,
    document.getElementById('root') as HTMLElement
);