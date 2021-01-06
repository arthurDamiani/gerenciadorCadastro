import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UsersList from './pages/UsersList'

function Routes() {
    return (
        <BrowserRouter>
            <Route path='/' exact component={Landing} />
            <Route path='/users' exact component={UsersList} />
        </BrowserRouter>
    )
}

export default Routes