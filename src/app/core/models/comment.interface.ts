import { IUser } from './user.interface'
export interface IComment {
  user: IUser
  comment: string
}
