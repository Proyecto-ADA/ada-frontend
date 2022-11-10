import { IUser } from './user.interface'
import { IComment } from './comment.interface'
export interface IArticle {
  id?: string
  body: string
  image: string | undefined
  categories: string[]
  isPublished: boolean
  user: IUser
  comments: IComment[]
  title: string
}
