import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/restaurant`
const GET_Gategory_URL = `${API_URL}/category`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios.post(`${USER_URL}/getAll`).then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}
const getGategory = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .post(`${GET_Gategory_URL}/getAll`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/getbyId`, {id})
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/create`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/update`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.post(`${USER_URL}/delete`, {id: userId}).then(() => {})
}
const uploadImage = (img: any): Promise<void> => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }
  return axios.post(`${API_URL}/upload`, img, config).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.post(`${USER_URL}/delete`, {id: id}))
  return axios.all(requests).then(() => {})
}

export {
  getUsers,
  deleteUser,
  deleteSelectedUsers,
  getUserById,
  createUser,
  updateUser,
  getGategory,
  uploadImage,
}
