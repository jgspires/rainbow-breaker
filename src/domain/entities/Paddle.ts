import { AnimationProps, IPaddle, PaddleProps } from '../contracts'
import { Position, Dimensions, Hitbox } from './components'
import { SpriteSheetData } from './engine'
import { SpriteOperations } from './utils'

export class Paddle implements IPaddle {
  position: Position
  dimensions: Dimensions
  hitbox: Hitbox
  animationProps: AnimationProps = {
    currentFrame: 0,
    maxFrame: 240
  }
  paddleProps: PaddleProps = {
    acceleration: 1.0,
    maxVelocity: 5
  }
  spriteSheetData: SpriteSheetData = {
    spriteSheetImage: document.getElementById('paddle-sprite-sheet')! as HTMLImageElement,
    spritePadding: { width: 12, height: 0 },
    spriteSize: { width: 115, height: 35 },
    spriteSheetSize: {
      columns: 4,
      rows: 1
    }
  }

  constructor(position: Position, dimensions: Dimensions) {
    this.position = position
    this.dimensions = dimensions
    this.hitbox = new Hitbox(this.position, this.dimensions)
  }

  update(): void {
    console.log(`updating paddle ${this}`)
    this.animationProps.currentFrame++

    if (this.animationProps.currentFrame > this.animationProps.maxFrame)
      this.animationProps.currentFrame = 0
  }

  collide(): void {
    throw new Error('Method not implemented.')
  }

  draw(context: CanvasRenderingContext2D): void {
    const spriteIndex = this.getPaddleSprite()
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

  getPaddleSprite(): number {
    const currentFrame = this.animationProps.currentFrame
    if (currentFrame < 60) return 0
    else if (currentFrame < 120) return 1
    else if (currentFrame < 180) return 2
    else return 3
  }
}
