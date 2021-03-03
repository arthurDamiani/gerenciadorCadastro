import axios from 'axios'

const api = axios.create({
    baseURL: 'https://damiani-user-api.herokuapp.com/'
})

export default api