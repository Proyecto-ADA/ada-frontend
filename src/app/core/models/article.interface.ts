export interface IArticle {
  body: string
  image: string | undefined
  categories: string[]
  isPublished: boolean
  user: Object
  comments: []
  title: string
}
