import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
 img? : string
 imgPromo?:string
 name?:string
 desc?:string
 priority?:number
 price?:number



}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  img:"",
imgPromo:"",
name:"",
desc:"",
priority:1,
price:0
}
