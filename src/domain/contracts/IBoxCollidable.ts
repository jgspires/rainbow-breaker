import { Dimensions, Position } from '../entities/components'

export type HitBox = {
  position: Position
  dimensions: Dimensions
}

export interface IBoxCollidable {
  hitbox: HitBox
  collide(): void
}
