import { IComment } from './comment.interface'
export interface IArticle {
  body: string
  image: string | undefined
  categories: string[]
  isPublished: boolean
  user: Object
  comments: IComment[]
  title: string
}
