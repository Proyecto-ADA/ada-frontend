export interface IQuestion {
  id: string
  question: string
  answer1: string
  answer2: string
  answer3: string
  score: number
  rightAnswerNumber: number
  isEnabled: boolean
  knowMoreUrl: string
}
