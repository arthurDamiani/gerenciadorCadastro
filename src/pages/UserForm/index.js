import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button, TextField} from '@material-ui/core'
import ButtonLogout from '../../components/ButtonLogout'
import api from '../../services/api'

import './userForm.css'

function UserForm() {
    const {id} = useParams()
    const history = useHistory()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {getUserData()},[])

    const token = sessionStorage.getItem('token')
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token

    async function getUserData() {
        await api.get(`user/${id}`)
        .then((res) => {
            console.log(res.data)
            setName(res.data.name)
            setEmail(res.data.email)
        })
    }

    async function handleUpdate(e) {
        e.preventDefault()
        await api.put(`user/${id}`, {
            name: name,
            email: email,
        })
        .then(() => {
            alert('Usuário editado com sucesso!')
            setTimeout(() => history.push('/users'), 3000)
        })
        .catch(() => alert('Não foi possível editar o usuário!'))

    }

    async function handleCreate(e) {
        e.preventDefault()
        await api.post('/user', {
            name: name,
            email: email,
            password: password,
        })
        .then(() => {
            alert('Usuário cadastrado com sucesso!')
            setTimeout(() => history.push('/users'), 3000)
        })
        .catch(() => alert('Falha ao cadastrar usuário!'))
    }

    const [confirmPasswordError, setConfirmPasswordError] = useState({valid:true, text:''})
    function confirmPasswordValidator() {
        if(password !== confirmPassword) {
            setConfirmPasswordError({valid:false, text:'Senhas incompativeis'})
        } else {
            setConfirmPasswordError({valid:true, text:''})
        }
    }

    return (
        <div className='user-form-container'>
            <header className='user-form-header'>
                <h2>{id ? 'Edição de usuário' : 'Cadastro de usuário'}</h2>
                <ButtonLogout />
            </header>
            <form 
                className='form-container' 
                onSubmit={id ? handleUpdate : handleCreate}
            >
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                    label='Nome'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    required
                    fullWidth
                />
                {id ? '' :
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    label='Senha'
                    type='password'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    required
                    fullWidth
                />}
                {id ? '' :
                <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={confirmPasswordValidator}
                    error={!confirmPasswordError.valid}
                    helperText={confirmPasswordError.text}
                    id='confirmPassword'
                    name='confirmPassword'
                    label='Confirma senha'
                    type='password'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    required
                    fullWidth
                />}
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    label='Email'
                    type='email'
                    variant='outlined'
                    margin='normal'
                    size='small'
                    required
                    fullWidth
                />
                <Button type='submit' variant='contained' color='primary'>{id ? 'Editar' : 'Cadastrar'}</Button>
            </form>
        </div>
    )
}

export default UserForm