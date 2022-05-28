import { Hitbox } from '../../entities/components'
import { ICollidable } from './ICollidable'

export interface IBoxCollision extends ICollidable {
  hitbox: Hitbox
}
