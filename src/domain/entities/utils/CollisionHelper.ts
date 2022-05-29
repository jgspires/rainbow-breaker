import { ICollidable } from '../../contracts/collision'

export class CollisionHelper {
  static checkCollision(collidable1: ICollidable, collidable2: ICollidable): boolean {
    const hitShape1 = collidable1.getHitShape()
    const hitShape2 = collidable2.getHitShape()

    if (!hitShape1.isColliding(hitShape2)) return false

    hitShape1.onCollision(hitShape2.hitType, hitShape2)
    hitShape2.onCollision(hitShape1.hitType, hitShape1)
    return true
  }
}
