import { ICircle } from '../../contracts'
import { IHitShape, HitType } from '../../contracts/collision'
import { BoxCircleCollisionStrategy } from '../utils/collisionStrategies'
import { Hitbox } from './Hitbox'
import { Position } from './Position'

export class Hitcircle implements IHitShape, ICircle {
  position: Position
  radius: number
  onCollision: Function
  hitType: HitType

  constructor(
    position: Position,
    radius: number,
    onCollision: Function,
    hitType: HitType = 'ball'
  ) {
    this.position = position
    this.radius = radius
    this.onCollision = onCollision
    this.hitType = hitType
  }

  isColliding(hitShape: IHitShape): boolean {
    if (hitShape instanceof Hitbox) return new BoxCircleCollisionStrategy().execute(hitShape, this)
    else return false
  }
}
