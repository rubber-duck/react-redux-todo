import React from 'react';
import { Route } from 'react-router';
import { Container, Navbar, Button } from 'react-bootstrap';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';
import { push, Push, ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as components from './components';
import * as actions from './actions';
import * as store from './store';


interface AppProps {
    history: History,
    itemCreate: typeof actions.itemCreate
}

export function AppPure({ history, itemCreate }: AppProps) {
    return <>
        <Navbar className="bg-dark justify-content-between" variant="dark" sticky="top" fixed="top">
            <Container>
                <Navbar.Brand href="/">ToDo list</Navbar.Brand>
                <Button onClick={() => itemCreate()} size="sm" variant="light">New ToDo</Button>
            </Container>
        </Navbar>
        <Container className="mainContainer">
            <ConnectedRouter history={history} context={ReactReduxContext}>
                <Route exact={true} path="/" render={() => <components.ToDoList />} />
                <Route exact={true} path="/add" render={() => <components.ToDoCreate />} />
                <Route exact={true} path="/edit/:itemId" render={({ match }) => <components.ToDoEdit itemId={parseInt(match.params.itemId)} />} />
            </ConnectedRouter>
        </Container>
    </>;
}

function mapStateToProps(state: store.Store, ownProps: { history: History }) {
    return ownProps;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({
        itemCreate: actions.itemCreate
    }, dispatch);
}

export const App = connect(null, mapDispatchToProps)(AppPure);