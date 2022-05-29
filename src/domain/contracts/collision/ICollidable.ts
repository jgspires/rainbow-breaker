import { IEntity } from '../IEntity'
import { HitType, IHitShape } from './IHitShape'

export interface ICollidable extends IEntity {
  collide(hitType: HitType, hitShape: IHitShape): void
  getHitShape(): IHitShape
}
