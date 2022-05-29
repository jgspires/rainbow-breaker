import { BlockLayout, defaultBlock, IBlock } from '../domain/contracts/blocks'
import { AverageBlock, BasicBlock, HeavyBlock, StronkBlock } from '../domain/entities/blocks'
import { Point } from '../domain/entities/components'
import { IBlockStager } from './contracts'

export class BlockStager implements IBlockStager {
  blockLayouts: BlockLayout[] = []
  maxRows = 5
  maxColumns = 10
  padding: Point

  constructor(private canvas: HTMLCanvasElement, padding: Point) {
    this.padding = padding
  }

  createLayout(index: number): IBlock[] | undefined {
    const blocks: IBlock[] = []
    if (index >= this.blockLayouts.length) return

    const layout = this.blockLayouts[index]

    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        if (layout[i][j] !== '0') {
          const blockPosition: Point = {
            x: defaultBlock.dimensions.width + this.padding.x * j,
            y: defaultBlock.dimensions.height + this.padding.y * i
          }
          blocks.push(this.createBlockOfType(layout[i][j], blockPosition))
        }
      }
    }

    return blocks
  }

  createBlockOfType(typeId: string, position: Point): IBlock {
    switch (typeId) {
      case '1':
        return new BasicBlock(position)
      case '2':
        return new AverageBlock(position)
      case '3':
        return new HeavyBlock(position)
      case '4':
        return new StronkBlock(position)
      default:
        return new BasicBlock(position)
    }
  }

  addLayout(blockLayout: BlockLayout): void {
    this.blockLayouts.push(blockLayout)
  }
}
