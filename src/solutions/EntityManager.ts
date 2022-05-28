import { IEntity } from '../domain/contracts'
import { ICollidable } from '../domain/contracts/collision'
import { EntitySubscriber } from '../domain/entities/engine'
import { CollisionHelper } from '../domain/entities/utils'
import { IEntityManager } from './contracts'

export class EntityManager implements IEntityManager {
  subscribers: EntitySubscriber[] = []

  constructor() {}

  addEntity(entity: ICollidable, alwaysCheckCollision: boolean = false): void {
    this.subscribers.push({ entity, _id: this.generateUniqueId(), alwaysCheckCollision })
  }

  removeEntity(entity: ICollidable): void {
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

  removeDestroyedEntities(): void {
    this.subscribers = this.subscribers.filter(sub => sub.entity.destroyed !== true)
  }

  checkEntityCollision(): void {
    const subscribersToCheck = this.subscribers.filter(
      subscriber => subscriber.alwaysCheckCollision === true
    )

    for (const actingSub of subscribersToCheck) {
      const otherSubscribers = this.subscribers.filter(sub => sub !== actingSub)
      for (const otherSub of otherSubscribers)
        CollisionHelper.checkCollision(actingSub.entity, otherSub.entity)
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
