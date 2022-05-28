import { IBall, IPaddle } from '../contracts'
import { IUseCase } from './contracts'

export namespace ILaunchBall {
  export type Props = {
    paddle: IPaddle
    ball: IBall
  }
}

export interface ILaunchBall extends IUseCase<ILaunchBall.Props> {}
