import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  catName?: string
  img?: string
  priority?: number
  rate?: number
  location?:any
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  name: '',
  catName: '',
  img: '',
  priority: 1,
  rate: 3,
}
