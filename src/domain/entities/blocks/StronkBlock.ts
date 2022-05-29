import { AbstractBlock } from '../../contracts/blocks'
import { Point } from '../components'

export class StronkBlock extends AbstractBlock {
  constructor(position: Point) {
    super(position)
    this.spriteSheetData.tint = {
      colour: '#f54242',
      opacity: 0.45
    }
    this.blockProps.maxHealth = 4
    this.blockProps.currentHealth = 4
  }
}
