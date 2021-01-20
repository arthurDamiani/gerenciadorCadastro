import React from 'react'
import api from '../../services/api'
import {Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

function ButtonLogout() {
    const history = useHistory()

    function handleLogout() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('authorizated')
        api.defaults.headers.Authorization = undefined
        history.push('/')
    }

    return (
        <Button onClick={handleLogout} variant='contained'>Logout</Button>
    )
}

export default ButtonLogout
