import { IBoxCollidable } from '../collision'

export type BlockProps = {
  maxHealth: number
  currentHealth: number
}

export interface IBlock extends IBoxCollidable {
  blockProps: BlockProps
}
