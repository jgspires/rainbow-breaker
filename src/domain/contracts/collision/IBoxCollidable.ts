import { Hitbox } from '../../entities/components'
import { ICollidable } from './ICollidable'

export interface IBoxCollidable extends ICollidable {
  hitbox: Hitbox
}
