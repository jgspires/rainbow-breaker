import { ICollidable } from '../../contracts/collision'

export type EntitySubscriber = {
  _id: number
  moved: boolean
  entity: ICollidable
}
