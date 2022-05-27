import { Position } from '../../entities/components'

export type HitType = 'ball' | 'block' | 'paddle'

export interface IHitShape {
  onCollision: Function
  hitType: HitType
  position: Position

  isColliding(hitShape: IHitShape): boolean
}
