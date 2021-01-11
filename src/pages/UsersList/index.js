import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core'
import api from '../../services/api'
import UserBox from '../../components/UserBox/index'
import ButtonLogout from '../../components/ButtonLogout'

import './userList.css'

function UsersList() {
    const [users, setUsers] = useState([])

    async function showUsers() {
        await api.get('/usuarios')
        .then((response) => {
            setUsers(response.data.content)
        })
    }

    useEffect(() => showUsers())

    return (
        <div>
            <header className='user-list-header'>
                <h2>Lista de usuários</h2>
                <div className='user-list-button-container'>
                    <Button href='/form' variant='contained' color='primary'>Novo</Button>
                    <ButtonLogout />
                </div>
            </header>
            <div className='list-description'>
                <p>Id</p>
                <p>Nome</p>
                <p>Usuário</p>
                <p>Idade</p>
                <p>Email</p>
                <p>Telefone</p>
                <p>Sexo</p>
                <p>Tipo</p>
            </div>
            {users.map((user, index) => {
                return <UserBox 
                            key={index}
                            id={user.id}
                            name={user.nome}
                            username={user.usuario}
                            age={user.idade}
                            phone={user.telefone}
                            email={user.email}
                            sex={user.sexo}
                            type={user.perfilTipo === 2 ? 'Administrador' : 'Normal'}
                        />
            })}
        </div>
    )
}

export default UsersList
