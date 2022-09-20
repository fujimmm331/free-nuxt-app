import { Nullable } from "./nullable"

export type TimerType = {
  id: Nullable<NodeJS.Timer>
  ms: number
}