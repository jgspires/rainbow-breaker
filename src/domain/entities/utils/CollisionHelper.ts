import { ICollidable } from '../../contracts/collision'

export class CollisionHelper {
  static checkCollision(collidable1: ICollidable, collidable2: ICollidable): boolean {
    const thisHitShape = collidable1.getHitShape()
    const otherHitShape = collidable2.getHitShape()

    if (!thisHitShape.isColliding(otherHitShape)) return false

    thisHitShape.onCollision(otherHitShape.hitType)
    otherHitShape.onCollision(thisHitShape.hitType)
    return true
  }
}
