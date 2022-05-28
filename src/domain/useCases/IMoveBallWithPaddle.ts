import { IBall, IPaddle } from '../contracts'
import { IUseCase } from './contracts'

export namespace IMoveBallWithPaddle {
  export type Props = {
    paddle: IPaddle
    ball: IBall
  }
}

export interface IMoveBallWithPaddle extends IUseCase<IMoveBallWithPaddle.Props> {}
