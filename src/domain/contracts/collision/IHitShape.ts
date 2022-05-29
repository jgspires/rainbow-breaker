import { Point } from '../../entities/components'

export type HitType = 'ball' | 'block' | 'paddle'

export interface IHitShape {
  onCollision: Function
  hitType: HitType
  position: Point

  isColliding(hitShape: IHitShape): boolean
}
