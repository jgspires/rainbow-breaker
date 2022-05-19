import { Dimensions, Position } from '.'

export class Hitbox {
  position: Position
  dimensions: Dimensions

  constructor(position: Position, dimensions: Dimensions) {
    this.position = position
    this.dimensions = dimensions
  }

  onCollision(collisor: Hitbox) {}
}
