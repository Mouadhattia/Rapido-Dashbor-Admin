import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  resId?: ID
  img?: string
  priority?: number
 
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  name: '',
  resId: null,
  img: '',
  priority: 1,
  
}
