import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './app';
import * as actions from './actions';
import './index.scss';

const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <App history={history} />
    </Provider>,
    document.getElementById('root'));

store.dispatch(actions.itemsLoad() as any);