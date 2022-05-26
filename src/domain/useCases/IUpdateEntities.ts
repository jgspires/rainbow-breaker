import { IEntityManager } from '../../solutions/contracts'
import { IUseCase } from './contracts'

export namespace IUpdateEntities {
  export type Props = {
    entityManager: IEntityManager
  }
}

export interface IUpdateEntities extends IUseCase<IUpdateEntities.Props> {}
