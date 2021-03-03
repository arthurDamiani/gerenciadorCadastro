import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core'
import api from '../../services/api'
import UserBox from '../../components/UserBox/index'
import ButtonLogout from '../../components/ButtonLogout'

import './userList.css'

function UsersList() {
    const [users, setUsers] = useState([])

    async function showUsers() {
        await api.get('/user')
        .then((response) => {
            setUsers(response.data.content)
        })
    }

    useEffect(() => showUsers())

    return (
        <div className='user-list-container'>
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
                <p>Email</p>
            </div>
            {users.map((user, index) => {
                return <UserBox 
                            key={index}
                            id={user.id}
                            name={user.name}
                            email={user.email}
                        />
            })}
        </div>
    )
}

export default UsersList
