import { IPaddle } from '../contracts'
import { IUseCase } from './contracts'

export namespace IKeepPaddleInBounds {
  export type Props = {
    paddle: IPaddle
    canvas: HTMLCanvasElement
  }
}

export interface IKeepPaddleInBounds extends IUseCase<IKeepPaddleInBounds.Props> {}
