import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  price?: number
  fee?: number
  totalPrice?: number
  createdAt?: string
  status?: string
  items?: any
  comment?: string
  path?: any
  resName?: string
  userName?: string
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  price: 0,
  fee: 0,
  totalPrice: 0,
  status: 'pending',
  resName: '',
}
