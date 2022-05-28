import { IBoxCollision } from './collision'
import { IFrameAnimated } from './IFrameAnimated'
import { IRectangle } from './IRectangle'

export type PaddleDirection = 'left' | 'right'

export type PaddleProps = {
  currentVelocity: number
  maxVelocity: number
  acceleration: number
  deceleration: number
}

export interface IPaddle extends IBoxCollision, IFrameAnimated, IRectangle {
  paddleProps: PaddleProps
  accelerate(direction: PaddleDirection): void
  keepInBounds(canvas: HTMLCanvasElement): void
}
