import { IEntityManager } from '../../solutions/contracts'
import { IUseCase } from './contracts'

namespace IRenderEntities {
  export type Props = {
    entityManager: IEntityManager
    context: CanvasRenderingContext2D
  }
}

export interface IRenderEntities extends IUseCase<IRenderEntities.Props> {}
