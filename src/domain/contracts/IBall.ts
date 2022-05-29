import { Point } from '../entities/components'
import { GameDirection } from '../entities/engine'
import { ICircleCollision } from './collision'
import { ICircle } from './ICircle'

export type BallState = 'moving' | 'paddle'

export type BallProps = {
  state: BallState
  velocity: Point
  maxVelocity: number
}

export interface IBall extends ICircleCollision, ICircle {
  ballProps: BallProps
  accelerate(direction: GameDirection): void
  keepInBounds(canvas: HTMLCanvasElement): void
  launch(paddleVelocity: number): void
}
