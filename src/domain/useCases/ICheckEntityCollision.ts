import { IEntityManager } from '../../solutions/contracts'
import { IUseCase } from './contracts'

export namespace ICheckEntityCollision {
  export type Props = {
    entityManager: IEntityManager
  }
}

export interface ICheckEntityCollision extends IUseCase<ICheckEntityCollision.Props> {}
