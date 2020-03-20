import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { AUTHOR } from './components/model/Author';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-161391381-1');

ReactDOM.render(
    <App author={AUTHOR} />,
    document.getElementById('root') as HTMLElement
);