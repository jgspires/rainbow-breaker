import { AbstractBlock } from '../../contracts/blocks'
import { Position } from '../components'

export class BasicBlock extends AbstractBlock {
  constructor(position: Position) {
    super(position)
    this.spriteSheetData.tint = {
      colour: '#26AEFF',
      opacity: 0.45
    }
  }
}
