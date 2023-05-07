import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
 rate? : number,
 comment?:string,



}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  rate:3,
  comment:""
}
