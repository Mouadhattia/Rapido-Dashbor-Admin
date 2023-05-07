import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  userId?: ID
  createdAt?: string
  type?: string
  items?: any
  status?: string
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  status: 'pending',
}
