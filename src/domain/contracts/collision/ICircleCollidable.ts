import { Hitcircle } from '../../entities/components'
import { ICollidable } from './ICollidable'

export interface ICircleCollidable extends ICollidable {
  hitcircle: Hitcircle
}
