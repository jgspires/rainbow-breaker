import { GameDirection } from '../entities/engine'
import { IBoxCollidable } from './IBoxCollidable'
import { IEntity } from './IEntity'
import { IFrameAnimated } from './IFrameAnimated'

export type PaddleDirection = 'left' | 'right'

export type PaddleProps = {
  currentVelocity: number
  maxVelocity: number
  acceleration: number
  deceleration: number
}

export interface IPaddle extends IEntity, IBoxCollidable, IFrameAnimated {
  paddleProps: PaddleProps
  accelerate(direction: PaddleDirection): void
}
