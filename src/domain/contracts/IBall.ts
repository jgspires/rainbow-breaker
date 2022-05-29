import { Point } from '../entities/components'
import { GameDirection } from '../entities/engine'
import { ICircleCollision } from './collision'
import { IBounded } from './IBounded'
import { ICircle } from './ICircle'
import { IPaddle } from './IPaddle'

export type BallState = 'moving' | 'paddle'

export type BallProps = {
  state: BallState
  velocity: Point
  maxVelocity: number
  paddle: IPaddle
  noCollisionFrames: {
    current: number
    base: number
  }
}

export interface IBall extends ICircleCollision, ICircle, IBounded {
  ballProps: BallProps
  accelerate(direction: GameDirection): void
  launch(paddleVelocity: number): void
}
