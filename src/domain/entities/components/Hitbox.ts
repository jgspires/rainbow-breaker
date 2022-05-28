import { Dimensions, Position } from '.'
import { IRectangle } from '../../contracts'
import { IHitShape, HitType } from '../../contracts/collision'
import { BoxCircleCollisionStrategy } from '../utils/collisionStrategies'
import { Hitcircle } from './Hitcircle'

export class Hitbox implements IHitShape, IRectangle {
  position: Position
  dimensions: Dimensions
  onCollision: Function
  hitType: HitType

  constructor(
    position: Position,
    dimensions: Dimensions,
    onCollision: Function,
    hitType: HitType = 'block'
  ) {
    this.position = position
    this.dimensions = dimensions
    this.onCollision = onCollision
    this.hitType = hitType
  }

  isColliding(hitShape: IHitShape): boolean {
    if (hitShape instanceof Hitcircle)
      return new BoxCircleCollisionStrategy().execute(this, hitShape)
    else return false
  }
}
