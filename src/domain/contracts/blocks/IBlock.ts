import { SpriteSheetData } from '../../entities/engine'
import { IBoxCollidable } from '../IBoxCollidable'
import { IEntity } from '../IEntity'

export type BlockProps = {
  maxHealth: number
  currentHealth: number
  colour: string
}

export type BlockPropChanges = {
  maxHealth?: number
  colour?: string
}

export interface IBlock extends IEntity, IBoxCollidable {
  blockProps: BlockProps
}
