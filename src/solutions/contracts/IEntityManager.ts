import { ICollidable } from '../../domain/contracts/collision'
import { EntitySubscriber } from '../../domain/entities/engine'

export interface IEntityManager {
  subscribers: EntitySubscriber[]

  addEntity(entity: ICollidable): void

  removeEntity(entity: ICollidable): void

  removeDestroyedEntities(): void

  checkMovedEntitiesCollision(): void

  drawEntities(context: CanvasRenderingContext2D): void

  updateEntities(): void

  markAsMoved(entity: ICollidable): boolean
}
