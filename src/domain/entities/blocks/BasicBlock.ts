import { AbstractBlock } from '../../contracts/blocks'
import { Point } from '../components'

export class BasicBlock extends AbstractBlock {
  constructor(position: Point) {
    super(position)
    this.spriteSheetData.tint = {
      colour: '#26AEFF',
      opacity: 0.45
    }
  }
}
