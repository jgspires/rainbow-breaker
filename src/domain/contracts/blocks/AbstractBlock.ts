import { Dimensions, Hitbox, Position } from '../../entities/components'
import { SpriteSheetData } from '../../entities/engine'
import { SpriteOperations } from '../../entities/utils'
import { BlockPropChanges, BlockProps, IBlock } from './IBlock'

const defaultBlock = {
  dimensions: {
    width: 80,
    height: 40
  },
  health: 1,
  spriteSheet: {
    spriteSheetImage: document.getElementById('block-sprite-sheet')! as HTMLImageElement,
    spritePadding: { width: 18, height: 10 },
    spriteSize: { width: 110, height: 54 },
    spriteSheetSize: {
      columns: 4,
      rows: 1
    }
  },
  colour: '#FFFFFF'
}

export abstract class AbstractBlock implements IBlock {
  blockProps: BlockProps = {
    colour: defaultBlock.colour,
    maxHealth: defaultBlock.health,
    currentHealth: defaultBlock.health
  }
  dimensions: Dimensions = defaultBlock.dimensions
  position: Position
  spriteSheetData: SpriteSheetData = defaultBlock.spriteSheet
  hitbox: Hitbox

  constructor(blockProps: BlockPropChanges, position: Position, dimensions?: Dimensions) {
    this.blockProps = {
      colour: blockProps.colour || this.blockProps.colour,
      maxHealth: blockProps.maxHealth || this.blockProps.maxHealth,
      currentHealth: blockProps.maxHealth || this.blockProps.maxHealth
    }
    this.position = position
    this.dimensions = dimensions || this.dimensions
    this.hitbox = new Hitbox(this.position, this.dimensions)
  }
  collide(): void {
    // TO DO
  }

  update(): void {
    console.log(`updating block ${this}`)
  }

  draw(context: CanvasRenderingContext2D): void {
    // Maybe attempt to add colour overlay to block (would be nice to have)
    const spriteIndex = this.getBlockSpriteIndex()
    const spriteStartPos = new SpriteOperations().getSpriteStartPos(
      spriteIndex,
      this.spriteSheetData
    )
    context.drawImage(
      this.spriteSheetData.spriteSheetImage,
      spriteStartPos.x,
      spriteStartPos.y,
      this.spriteSheetData.spriteSize.width,
      this.spriteSheetData.spriteSize.height,
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    )
  }

  getBlockSpriteIndex(): number {
    if (this.blockProps.currentHealth / this.blockProps.maxHealth === 1) return 0
    else if (this.blockProps.currentHealth / this.blockProps.maxHealth >= 0.7) return 1
    else if (this.blockProps.currentHealth / this.blockProps.maxHealth >= 0.5) return 2
    else if (this.blockProps.currentHealth / this.blockProps.maxHealth >= 0.3) return 3

    return -1
  }
}
