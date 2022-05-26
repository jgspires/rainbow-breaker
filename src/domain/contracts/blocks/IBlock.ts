import { IBoxCollidable } from '../IBoxCollidable'
import { IEntity } from '../IEntity'

export type BlockProps = {
  maxHealth: number
  currentHealth: number
}

export interface IBlock extends IEntity, IBoxCollidable {
  blockProps: BlockProps
}
