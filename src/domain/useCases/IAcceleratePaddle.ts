import { IEntityManager } from '../../solutions/contracts'
import { IPaddle, PaddleDirection } from '../contracts'
import { IUseCase } from './contracts'

export namespace IAcceleratePaddle {
  export type Props = {
    paddle: IPaddle
    direction: PaddleDirection
  }
}

export interface IAcceleratePaddle extends IUseCase<IAcceleratePaddle.Props> {}
