import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Button, TextField, Select} from '@material-ui/core'
import ButtonLogout from '../../components/ButtonLogout'
import api from '../../services/api'

import './userForm.css'

function UserForm() {
    const {id} = useParams()
    const history = useHistory()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [age, setAge] = useState('')
    const [birth, setBirth] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [accountType, setAccountType] = useState(1)

    const token = sessionStorage.getItem('token')
    const header = {
        headers: {'Authorization': 'Bearer ' + token}
    }

    async function getUserData() {
        await api.get(`usuarios/${id}`, {}, header)
        .then((res) => {
            setName(res.data.nome)
            setAge(res.data.idade)
            setBirth(res.data.dataNascimento)
            setEmail(res.data.email)
            setPhone(res.data.telefone)
            setSex(res.data.sexo)
        })
    }

    useEffect(() => {getUserData()},[id])
   

    const [confirmPasswordError, setConfirmPasswordError] = useState({valid:true, text:''})
    function confirmPasswordValidator() {
        if(password !== confirmPassword) {
            setConfirmPasswordError({valid:false, text:'Senhas incompativeis'})
        } else {
            setConfirmPasswordError({valid:true, text:''})
        }
    }

    async function handleUpdate(e) {
        e.preventDefault()
        await api.put(`usuarios/${id}`, {
            dataNascimento: birth,
            email: email,
            idade: age,
            nome: name,
            sexo: sex,
            telefone: phone,
        }, header)
        .then(() => {
            alert('Usuário editado com sucesso!')
            setTimeout(() => history.push('/users'), 3000)
        })
        .catch(() => alert('Não foi possível editar o usuário!'))

    }

    async function handleCreate(e) {
        e.preventDefault()
        await api.post('/usuarios', {
            dataNascimento: birth,
            email: email,
            idade: age,
            nome: name,
            perfilId: accountType,
            senha: password,
            sexo: sex,
            telefone: phone,
            usuario: username
        }, header)
        .then(() => {
            alert('Usuário cadastrado com sucesso!')
            setTimeout(() => history.push('/users'), 3000)
        })
        .catch(() => alert('Falha ao cadastrar usuário!'))
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
                    required
                    fullWidth
                />
                {id ? '' :
                <TextField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id='username'
                    label='Nome de usuário'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />}
                {id ? '' :
                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    label='Senha'
                    type='password'
                    variant='outlined'
                    margin='normal'
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
                    required
                    fullWidth
                />}
                <TextField
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    id='age'
                    label='Idade'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <TextField
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                    id='birth'
                    label='Data de nascimento'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    label='Email'
                    type='email'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <TextField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id='phone'
                    label='Telefone'
                    type='text'
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                />
                <div className='form-end'>
                    <div className='select-container'>
                        <Select
                            native
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            variant='outlined'
                        >
                            <option defaultChecked value="">Sexo</option>
                            <option value='MASCULINO'>Masculino</option>
                            <option value='FEMININO'>Feminino</option>
                        </Select>
                        {id ? '' :
                        <Select
                            native
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            variant='outlined'
                        >
                            <option defaultChecked value={1}>Tipo de conta</option>
                            <option value={1}>Normal</option>
                            <option value={2}>Admin</option>
                        </Select>}
                    </div>
                    <Button type='submit' variant='contained' color='primary'>{id ? 'Editar' : 'Cadastrar'}</Button>
                </div>
            </form>
        </div>
    )
}

export default UserForm