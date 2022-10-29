import { IQuestion } from 'src/app/core/models/question.interface'

export interface IQuizzHistory {
  id?: string
  questions: IQuestion[]
  answers: number[]
  score: number
  rightAnswers: number
}
