import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
 imgPromo? : string


}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  imgPromo:""
}
