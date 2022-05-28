import { ICollidable } from '../../contracts/collision'

export type EntitySubscriber = {
  _id: number
  alwaysCheckCollision: boolean
  entity: ICollidable
}
