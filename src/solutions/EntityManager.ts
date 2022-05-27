import { IEntity } from '../domain/contracts'
import { ICollidable } from '../domain/contracts/collision'
import { EntitySubscriber } from '../domain/entities/engine'
import { CollisionHelper } from '../domain/entities/utils'
import { IEntityManager } from './contracts'

export class EntityManager implements IEntityManager {
  subscribers: EntitySubscriber[] = []

  constructor() {}

  addEntity(entity: ICollidable): void {
    this.subscribers.push({ entity, _id: this.generateUniqueId(), moved: false })
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

  checkMovedEntitiesCollision(): void {
    const subscribersThatMoved = this.subscribers.filter(subscriber => subscriber.moved === true)

    for (const movingSub of subscribersThatMoved) {
      const otherSubscribers = this.subscribers.filter(sub => sub !== movingSub)
      for (const otherSub of otherSubscribers)
        CollisionHelper.checkCollision(movingSub.entity, otherSub.entity)
      movingSub.moved = false
    }
  }

  markAsMoved(entity: ICollidable): boolean {
    const entitySubscriber = this.subscribers.find(subscriber => subscriber.entity === entity)
    if (!entitySubscriber) return false

    entitySubscriber.moved = true
    return true
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
