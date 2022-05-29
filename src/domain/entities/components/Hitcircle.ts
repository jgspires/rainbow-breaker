import { ICircle } from '../../contracts'
import { IHitShape, HitType } from '../../contracts/collision'
import { BoxCircleCollisionStrategy } from '../utils/collisionStrategies'
import { Hitbox } from './Hitbox'
import { Point } from './Position'

export class Hitcircle implements IHitShape, ICircle {
  position: Point
  radius: number
  onCollision: Function
  hitType: HitType

  constructor(position: Point, radius: number, onCollision: Function, hitType: HitType = 'ball') {
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
