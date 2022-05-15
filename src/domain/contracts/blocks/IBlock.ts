import { SpriteSheetData } from '../../entities/engine'
import { IBoxCollidable } from '../IBoxCollidable'
import { IEntity } from '../IEntity'

export type BlockProps = {
  maxHealth: number
  currentHealth: number
  colour: string
  spriteSheetData: SpriteSheetData
}

export type BlockPropChanges = {
  maxHealth?: number
  colour?: string
  spriteSheetData?: SpriteSheetData
}

export interface IBlock extends IEntity, IBoxCollidable {
  blockProps: BlockProps
}
