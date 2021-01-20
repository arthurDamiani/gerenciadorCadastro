import React from 'react'
import {Delete, Edit} from '@material-ui/icons'
import api from '../../services/api'

import './userBox.css'

function UserBox(props) {
    const token = sessionStorage.getItem('token')
    const header = {
        headers: {'Authorization': 'Bearer ' + token}
    }

    async function deleteUser() {
        await api.delete(`usuarios/${props.id}`, header)
        .then(() => alert('Usuário apagado com sucesso!'))
        .catch(() => alert('Não foi possível apagar o usuário'), console.log(token))
    }

    return (
        <div className='user-box'>
            <div className='user-data'>
                <p>{props.id}</p>
                <p>{props.name}</p>
                <p>{props.username}</p>
                <p>{props.age}</p>
                <p>{props.email}</p>
                <p>{props.phone}</p>
                <p>{props.sex}</p>
                <p>{props.type}</p>
            </div>
            <div className='user-box-buttons-container'>
                <a href={`/form/${props.id}`} className='edit-button'><Edit /></a>
                <button onClick={deleteUser} className='delete-button'><Delete /></button>
            </div>
        </div>
    )
}

export default UserBox