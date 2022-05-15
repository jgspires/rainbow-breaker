import { Dimensions, Position } from '../../entities/components'
import { SpriteSheetData } from '../../entities/engine'
import { SpriteOperations } from '../../entities/utils'
import { HitBox } from '../IBoxCollidable'
import { BlockPropChanges, BlockProps, IBlock } from './IBlock'

export abstract class AbstractBlock implements IBlock {
  static DEFAULT_DIMENSIONS: Dimensions = {
    width: 80,
    height: 40
  }
  static DEFAULT_HEALTH: number = 1
  static DEFAULT_SPRITE_SHEET: SpriteSheetData = {
    spriteSheetImage: document.getElementById('block-sprite-sheet')! as HTMLImageElement,
    spritePadding: { width: 18, height: 10 },
    spriteSize: { width: 110, height: 54 },
    spriteSheetSize: {
      columns: 4,
      rows: 1
    }
  }
  static DEFAULT_COLOUR: string = '#FFFFFF'

  blockProps: BlockProps = {
    colour: AbstractBlock.DEFAULT_COLOUR,
    maxHealth: AbstractBlock.DEFAULT_HEALTH,
    currentHealth: AbstractBlock.DEFAULT_HEALTH,
    spriteSheetData: AbstractBlock.DEFAULT_SPRITE_SHEET
  }
  dimensions: Dimensions = AbstractBlock.DEFAULT_DIMENSIONS
  position: Position
  hitbox: HitBox

  constructor(blockProps: BlockPropChanges, position: Position, dimensions?: Dimensions) {
    this.blockProps = {
      colour: blockProps.colour || this.blockProps.colour,
      maxHealth: blockProps.maxHealth || this.blockProps.maxHealth,
      currentHealth: blockProps.maxHealth || this.blockProps.maxHealth,
      spriteSheetData: blockProps.spriteSheetData || this.blockProps.spriteSheetData
    }
    this.position = position
    this.dimensions = dimensions || this.dimensions
    this.hitbox = {
      dimensions: this.dimensions,
      position: this.position
    }
  }
  collide(): void {
    // TO DO
  }

  update(): void {
    console.log(`updating block ${this}`)
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.blockProps.colour
    const spriteIndex = this.getBlockSpriteIndex()
    const spriteStartPos = new SpriteOperations().getSpriteStartPos(
      spriteIndex,
      this.blockProps.spriteSheetData
    )
    context.drawImage(
      this.blockProps.spriteSheetData.spriteSheetImage,
      spriteStartPos.x,
      spriteStartPos.y,
      this.blockProps.spriteSheetData.spriteSize.width,
      this.blockProps.spriteSheetData.spriteSize.height,
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    )
    // context.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.dimensions.width,
    //   this.dimensions.height
    // )
  }

  getBlockSpriteIndex(): number {
    if (this.blockProps.currentHealth / this.blockProps.maxHealth === 1) return 0
    else if (this.blockProps.currentHealth / this.blockProps.maxHealth >= 0.7) return 1
    else if (this.blockProps.currentHealth / this.blockProps.maxHealth >= 0.5) return 2
    else if (this.blockProps.currentHealth / this.blockProps.maxHealth >= 0.3) return 3

    return -1
  }
}
