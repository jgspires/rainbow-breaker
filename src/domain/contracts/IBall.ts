import { VelocityProps } from '../entities/components'
import { ICircleCollision } from './collision'
import { ICircle } from './ICircle'
import { PaddleDirection } from './IPaddle'

export interface IBall extends ICircleCollision, ICircle {
  paddleProps: VelocityProps
  accelerate(direction: PaddleDirection): void
  keepInBounds(canvas: HTMLCanvasElement): void
}
