import { AbstractBlock } from '../../contracts/blocks'
import { Point } from '../components'

export class AverageBlock extends AbstractBlock {
  constructor(position: Point) {
    super(position)
    this.spriteSheetData.tint = {
      colour: '#42f57b',
      opacity: 0.45
    }
    this.blockProps.maxHealth = 2
    this.blockProps.currentHealth = 2
  }
}
