import React, {useState} from 'react'
import {Button, TextField, InputAdornment} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {Person, Lock} from '@material-ui/icons'
import api from '../../services/api'

import './landing.css'

function Landing() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        await api.post('/autenticacao', {
            usuario: username,
            senha: password
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('authorizated', true)
            api.defaults.headers.Authorization = `BEARER ${response.data.token}`
            history.push('/users')
        })
        .catch(() => alert('Usuário ou senha incorreta!'))
    }

    return (
        <div className='login-container'>
            <h1 className='login-title'>Login</h1>
            <form className='login-form' onSubmit={handleLogin}>
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
