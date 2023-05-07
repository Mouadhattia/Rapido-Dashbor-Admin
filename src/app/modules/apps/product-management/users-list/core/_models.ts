import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  menuId?: ID
  desc?: string
  price?: number
  img?: string
  priority?: number
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  name: '',
  desc: '',
  img: '',
  menuId: null,
  price: 0,
  priority: 1,
}
