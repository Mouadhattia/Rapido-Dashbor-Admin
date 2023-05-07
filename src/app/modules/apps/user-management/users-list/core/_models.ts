import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  email?: string
  phone?: string
  userName?: string
  createdAt?: string
  gender?: string
  birthDay?: string
  address?: string
  fullname?: string
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  fullname: '',
  email: '',
  userName: '',
  gender: 'male',
  birthDay: '',
  address: '',
  phone: '',
}
