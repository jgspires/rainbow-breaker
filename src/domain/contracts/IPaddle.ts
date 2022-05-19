import { IBoxCollidable } from './IBoxCollidable'
import { IEntity } from './IEntity'
import { IFrameAnimated } from './IFrameAnimated'

export type PaddleProps = {
  maxVelocity: number
  acceleration: number
}

export interface IPaddle extends IEntity, IBoxCollidable, IFrameAnimated {
  paddleProps: PaddleProps
}
