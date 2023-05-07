import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  price?: number
  prodId?: ID
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  name: '',
  price: 0,
}
