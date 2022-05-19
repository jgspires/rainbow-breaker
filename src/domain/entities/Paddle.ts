import { AnimationProps, IPaddle, PaddleProps } from '../contracts'
import { Position, Dimensions, Hitbox } from './components'
import { SpriteSheetData } from './engine'
import { SpriteHelper } from './utils'

export class Paddle implements IPaddle {
  position: Position
  dimensions: Dimensions
  hitbox: Hitbox
  animationProps: AnimationProps = {
    currentFrame: 0,
    maxFrame: 360
  }
  paddleProps: PaddleProps = {
    acceleration: 1.0,
    maxVelocity: 5
  }
  spriteSheetData: SpriteSheetData = {
    spriteSheetImage: document.getElementById('paddle-sprite-sheet')! as HTMLImageElement,
    spritePadding: { width: 11, height: 0 },
    spriteSize: { width: 117, height: 35 },
    spriteSheetSize: {
      columns: 4,
      rows: 1
    }
  }

  constructor(position: Position) {
    this.position = position
    this.dimensions = { width: 115, height: 35 }
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
    const spriteStartPos = new SpriteHelper().getSpriteStartPos(spriteIndex, this.spriteSheetData)
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
    const animationState = SpriteHelper.getAnimationCycleState(this.animationProps, 6)
    if (animationState === 1 || animationState === 7) return 0
    else if (animationState === 2 || animationState === 6) return 1
    else if (animationState === 3 || animationState === 5) return 2
    else return 3
  }
}
