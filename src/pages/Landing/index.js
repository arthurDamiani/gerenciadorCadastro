import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, TextField, InputAdornment} from '@material-ui/core'
import {Person, Lock} from '@material-ui/icons'
import {Context} from '../../contexts/AuthContext'
import api from '../../services/api'

import './landing.css'

function Landing() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {authenticated, setAuthenticatedTrue} = useContext(Context)

    async function handleLogin(e) {
        e.preventDefault()
        const { data: {token} } = await api.post('/autenticacao', {
            usuario: username,
            senha: password
        })
        .then(() => {
            localStorage.setItem('token', JSON.stringify(token))
            api.defaults.headers.Authorization = `Bearer ${token}`
            history.push('/users')
            console.log(token)
            setAuthenticatedTrue()
        })
    }

    return (
        <div className='login-container'>
            <h1 className='login-title'>Login</h1>
            <form className='login-box' onSubmit={handleLogin}>
                <TextField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Person />
                            </InputAdornment>
                        )
                    }}
                    label='Nome de usuário'
                    variant='outlined'
                    size='small'
                    type='text'
                    margin='normal'
                    fullWidth
                />
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Lock />
                            </InputAdornment>
                        )
                    }}
                    label='Senha'
                    variant='outlined'
                    size='small'
                    type='password'
                    margin='normal'
                    fullWidth
                />
                <div className='button-login-container'>
                    <Button variant='contained' color='primary' type='submit' fullWidth>Entrar</Button>
                </div>
            </form>
        </div>
    )
}

export default Landing
