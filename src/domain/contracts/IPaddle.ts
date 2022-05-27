import { IBoxCollidable } from './collision'
import { IEntity } from './IEntity'
import { IFrameAnimated } from './IFrameAnimated'

export type PaddleDirection = 'left' | 'right'

export type PaddleProps = {
  currentVelocity: number
  maxVelocity: number
  acceleration: number
  deceleration: number
}

export interface IPaddle extends IBoxCollidable, IFrameAnimated {
  paddleProps: PaddleProps
  accelerate(direction: PaddleDirection): void
  keepInBounds(canvas: HTMLCanvasElement): void
}
