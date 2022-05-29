import { AbstractBlock } from '../../contracts/blocks'
import { Point } from '../components'

export class HeavyBlock extends AbstractBlock {
  constructor(position: Point) {
    super(position)
    this.spriteSheetData.tint = {
      colour: '#d4f542',
      opacity: 0.45
    }
    this.blockProps.maxHealth = 3
    this.blockProps.currentHealth = 3
  }
}
