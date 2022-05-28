import { ICollidable } from '../../domain/contracts/collision'
import { EntitySubscriber } from '../../domain/entities/engine'

export interface IEntityManager {
  subscribers: EntitySubscriber[]

  addEntity(entity: ICollidable, alwaysCheckCollision?: boolean): void

  removeEntity(entity: ICollidable): void

  removeDestroyedEntities(): void

  checkEntityCollision(): void

  drawEntities(context: CanvasRenderingContext2D): void

  updateEntities(): void
}
