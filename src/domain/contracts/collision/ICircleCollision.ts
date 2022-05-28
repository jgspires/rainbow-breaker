import { Hitcircle } from '../../entities/components'
import { ICollidable } from './ICollidable'

export interface ICircleCollision extends ICollidable {
  hitcircle: Hitcircle
}
