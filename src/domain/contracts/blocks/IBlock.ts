import { IBoxCollision } from '../collision'

export type BlockProps = {
  maxHealth: number
  currentHealth: number
}

export interface IBlock extends IBoxCollision {
  blockProps: BlockProps
}
