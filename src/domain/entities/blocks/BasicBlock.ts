import { AbstractBlock, BlockProps } from '../../contracts/blocks'
import { Dimensions, Position } from '../components'

export class BasicBlock extends AbstractBlock {
  constructor(position: Position) {
    const blockProps = {
      colour: '#26AEFF'
    }
    super(blockProps, position)
  }
}
