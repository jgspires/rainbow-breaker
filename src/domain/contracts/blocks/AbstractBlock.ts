import { Dimensions, Hitbox, Point } from '../../entities/components'
import { SpriteSheetData } from '../../entities/engine'
import { SpriteHelper } from '../../entities/utils'
import { HitType, IHitShape } from '../collision'
import { IBlock, BlockProps } from '.'

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
  }
}

export abstract class AbstractBlock implements IBlock {
  blockProps: BlockProps = {
    maxHealth: defaultBlock.health,
    currentHealth: defaultBlock.health
  }
  destroyed: boolean = false
  dimensions: Dimensions = defaultBlock.dimensions
  position: Point
  spriteSheetData: SpriteSheetData = defaultBlock.spriteSheet
  hitbox: Hitbox

  constructor(position: Point, dimensions?: Dimensions) {
    this.position = position
    this.dimensions = dimensions || this.dimensions
    this.hitbox = new Hitbox(this.position, this.dimensions, this.collide.bind(this))
  }

  getHitShape(): IHitShape {
    return this.hitbox
  }

  collide(hitType: HitType): void {
    console.log(this)
    console.log(`Block colliding with hitType: ${hitType}`)

    if (hitType === 'ball') this.takeDamage()
  }

  takeDamage(): void {
    console.log('Taking damage!')
    this.blockProps.currentHealth -= 1
    if (this.blockProps.currentHealth <= 0) this.destroyed = true
  }

  update(): void {
    // console.log(`updating block ${this}`)
  }

  draw(context: CanvasRenderingContext2D): void {
    const spriteIndex = this.getBlockSpriteIndex()
    const spriteStartPos = new SpriteHelper().getSpriteStartPos(spriteIndex, this.spriteSheetData)
    SpriteHelper.drawSprite(
      spriteStartPos,
      this.position,
      this.dimensions,
      this.spriteSheetData,
      context
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
