import { IBounded, IPaddle } from '../contracts'
import { IUseCase } from './contracts'

export namespace IKeepEntityInBounds {
  export type Props = {
    entity: IBounded
    canvas: HTMLCanvasElement
  }
}

export interface IKeepEntityInBounds extends IUseCase<IKeepEntityInBounds.Props> {}
