import { IEntity } from '../domain/contracts'
import { EntitySubscriber } from '../domain/entities/engine'
import { IEntityManager } from './contracts'

export class EntityManager implements IEntityManager {
  subscribers: EntitySubscriber[] = []

  constructor() {}

  addEntity(entity: IEntity): void {
    this.subscribers.push({ entity, _id: this.generateUniqueId() })
  }

  removeEntity(entity: IEntity): void {
    const subscriberToRemove = this.subscribers.find(subscriber => subscriber.entity === entity)
    if (subscriberToRemove === undefined) return

    this.subscribers.splice(this.subscribers.indexOf(subscriberToRemove))
  }

  drawEntities(context: CanvasRenderingContext2D): void {
    for (const subscriber of this.subscribers) {
      subscriber.entity.draw(context)
    }
  }

  updateEntities(): void {
    for (const subscriber of this.subscribers) {
      subscriber.entity.update()
    }
  }

  generateUniqueId(): number {
    const existingIds = this.subscribers.map(entity => entity._id)
    let newId = 0
    while (existingIds.includes(newId)) {
      newId++
    }
    return newId
  }
}
