import { AbstractBlock } from '../../contracts/blocks'
import { Position } from '../components'

export class BasicBlock extends AbstractBlock {
  constructor(position: Position) {
    const blockProps = {
      colour: '#26AEFF'
    }
    super(blockProps, position)
  }
}
