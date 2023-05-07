import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
 img? : string,
 desc?:string,
 title?:string


}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  img:"",
  desc:"",
  title:""
}
