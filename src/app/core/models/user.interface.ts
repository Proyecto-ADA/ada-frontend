export interface IUser {
  id?: string
  uid: string | undefined
  email: string
  profileImage: string
  firstName: string
  lastName: string
  likedArticles: string[]
}
