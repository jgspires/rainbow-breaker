import { BlockLayout, IBlock } from '../../domain/contracts/blocks'
import { Point } from '../../domain/entities/components'

export interface IBlockStager {
  blockLayouts: BlockLayout[]
  padding: Point

  createLayout(index: number): IBlock[] | undefined

  addLayout(blockLayout: BlockLayout): void
}
