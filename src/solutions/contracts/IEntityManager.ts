import { IEntity } from '../../domain/contracts'
import { EntitySubscriber } from '../../domain/entities/engine'

export interface IEntityManager {
  subscribers: EntitySubscriber[]

  addEntity(entity: IEntity): void

  removeEntity(entity: IEntity): void

  drawEntities(context: CanvasRenderingContext2D): void
}
