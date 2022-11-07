import { IComment } from './comment.interface'
export interface IArticle {
  id?: number
  body: string
  image: string | undefined
  categories: string[]
  isPublished: boolean
  user: Object
  comments: IComment[]
  title: string
}
