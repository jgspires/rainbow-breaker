import { Position } from '../entities/components'
import { GameDirection } from '../entities/engine'
import { ICircleCollision } from './collision'
import { ICircle } from './ICircle'

export type BallState = 'moving' | 'paddle'

export type BallProps = {
  state: BallState
  currentVelocity: Position
  maxVelocity: number
  acceleration: number
  deceleration: number
}

export interface IBall extends ICircleCollision, ICircle {
  ballProps: BallProps
  accelerate(direction: GameDirection): void
  keepInBounds(canvas: HTMLCanvasElement): void
  launch(paddleVelocity: number): void
}
