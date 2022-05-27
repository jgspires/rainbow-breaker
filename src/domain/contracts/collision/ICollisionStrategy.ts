import { IHitShape } from './IHitShape'

export interface ICollisionStrategy {
  execute(shape1: IHitShape, shape2: IHitShape): boolean
}
