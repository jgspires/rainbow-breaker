import { ICollisionStrategy, IHitShape } from '../../../contracts/collision'
import { Hitbox, Hitcircle } from '../../components'

export class BoxCircleCollisionStrategy implements ICollisionStrategy {
  /**
   * This collision strategy accepts a hitbox (which must come as the first argument)
   * and a hitcircle (which must be provided as the second argument)
   *
   * @param hitbox The hitbox for which to test the collision
   * @param hitcircle The hitcircle for which to test the collision
   *
   * @returns Whether or not these two hitshapes are colliding
   *
   */
  execute(hitbox: IHitShape, hitcircle: IHitShape): boolean {
    if (!(hitbox instanceof Hitbox) || !(hitcircle instanceof Hitcircle)) return false
    return this.executeBoxCircleCollision(hitbox, hitcircle)
  }

  // Checks if hitbox and hitcircle are colliding
  // easily the most complex piece of code in the game.
  executeBoxCircleCollision(hitbox: Hitbox, hitcircle: Hitcircle): boolean {
    const circle = {
      x: hitcircle.position.x,
      y: hitcircle.position.y,
      radius: hitcircle.radius
    }
    const rectangle = {
      x: hitbox.position.x,
      y: hitbox.position.y,
      width: hitbox.dimensions.width,
      height: hitbox.dimensions.height
    }

    const distX = Math.abs(circle.x - rectangle.x - rectangle.width / 2)
    const distY = Math.abs(circle.y - rectangle.y - rectangle.height / 2)

    if (distX > rectangle.width / 2 + circle.radius || distY > rectangle.height / 2 + circle.radius)
      return false

    if (distX <= rectangle.width / 2 || distY <= rectangle.height / 2) return true

    const dx = distX - rectangle.width / 2
    const dy = distY - rectangle.height / 2
    return dx * dx + dy * dy <= circle.radius * circle.radius
  }
}
