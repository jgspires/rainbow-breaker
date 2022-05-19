import { Hitbox } from '../entities/components'

export interface IBoxCollidable {
  hitbox: Hitbox
  collide(): void
}
