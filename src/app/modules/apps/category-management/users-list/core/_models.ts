import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  img?: string
  priority?:number
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
 name:"",
 img:"",
 priority:1
  
 
  
  
}
