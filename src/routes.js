import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Landing from './pages/Landing'
import UsersList from './pages/UsersList'
import UserForm from './pages/UserForm'

function CustomRoute({isPrivate, ...rest}) {
    if(isPrivate && !sessionStorage.getItem('authorizated')) {
        return <Redirect to='/' />
    }
    return <Route {...rest} />
}

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <CustomRoute path='/' exact component={Landing} />
                <CustomRoute isPrivate path='/users' exact component={UsersList} />
                <CustomRoute path={['/form', '/form/:id']} exact component={UserForm} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes