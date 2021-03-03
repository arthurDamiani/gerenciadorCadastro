import React from 'react'
import {Delete, Edit} from '@material-ui/icons'
import api from '../../services/api'

import './userBox.css'

function UserBox(props) {
    const token = sessionStorage.getItem('token')
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token

    async function deleteUser() {
        await api.delete(`user/${props.id}`)
        .then(() => alert('Usuário apagado com sucesso!'))
        .catch(() => alert('Não foi possível apagar o usuário'), console.log(token))
    }

    return (
        <div className='user-box'>
            <div className='user-data'>
                <p>{props.id}</p>
                <p>{props.name}</p>
                <p>{props.email}</p>
            </div>
            <div className='user-box-buttons-container'>
                <a href={`/form/${props.id}`} className='edit-button'><Edit /></a>
                <button onClick={deleteUser} className='delete-button'><Delete /></button>
            </div>
        </div>
    )
}

export default UserBox