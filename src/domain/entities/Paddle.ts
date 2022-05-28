import { AnimationProps, IPaddle, PaddleDirection, PaddleProps } from '../contracts'
import { HitType, IHitShape } from '../contracts/collision'
import { Dimensions, Hitbox, Position } from './components'
import { SpriteSheetData } from './engine'
import { SpriteHelper } from './utils'

export class Paddle implements IPaddle {
  position: Position
  dimensions: Dimensions
  hitbox: Hitbox
  destroyed: boolean
  animationProps: AnimationProps
  paddleProps: PaddleProps
  spriteSheetData: SpriteSheetData

  constructor(position: Position) {
    this.position = position
    this.dimensions = { width: 115, height: 35 }
    this.hitbox = new Hitbox(this.position, this.dimensions, this.collide, 'paddle')
    this.destroyed = false

    this.spriteSheetData = {
      spriteSheetImage: document.getElementById('paddle-sprite-sheet')! as HTMLImageElement,
      spritePadding: { width: 11, height: 0 },
      spriteSize: { width: 117, height: 35 },
      spriteSheetSize: {
        columns: 4,
        rows: 1
      }
    }

    this.animationProps = {
      currentFrame: 0,
      maxFrame: 360
    }

    this.paddleProps = {
      currentVelocity: 0.0,
      acceleration: 1.5,
      deceleration: 0.25,
      maxVelocity: 5.0
    }
  }

  accelerate(direction: PaddleDirection): void {
    if (
      (direction === 'right' && this.paddleProps.currentVelocity < 0) ||
      (direction === 'left' && this.paddleProps.currentVelocity > 0)
    )
      this.paddleProps.currentVelocity = 0

    if (direction === 'right') this.paddleProps.currentVelocity += this.paddleProps.acceleration
    else this.paddleProps.currentVelocity -= this.paddleProps.acceleration

    if (this.paddleProps.currentVelocity > this.paddleProps.maxVelocity)
      this.paddleProps.currentVelocity = this.paddleProps.maxVelocity
    else if (this.paddleProps.currentVelocity < this.paddleProps.maxVelocity * -1)
      this.paddleProps.currentVelocity = this.paddleProps.maxVelocity * -1
  }

  update(): void {
    this.animate()
    this.move()
  }

  move(): void {
    if (this.paddleProps.currentVelocity > 0)
      this.paddleProps.currentVelocity = Math.max(
        this.paddleProps.currentVelocity - this.paddleProps.deceleration,
        0
      )
    else if (this.paddleProps.currentVelocity < 0)
      this.paddleProps.currentVelocity = Math.min(
        this.paddleProps.currentVelocity + this.paddleProps.deceleration,
        0
      )

    this.position.x = this.position.x + this.paddleProps.currentVelocity
    this.updateHitShapePosition()
  }

  keepInBounds(canvas: HTMLCanvasElement): void {
    if (this.position.x < 0) this.position.x = 0
    else if (this.position.x + this.dimensions.width > canvas.width)
      this.position.x = canvas.width - this.dimensions.width
  }

  collide(hitType: HitType): void {
    console.log(`Paddle colliding with hitType: ${hitType}`)
  }

  getHitShape(): IHitShape {
    return this.hitbox
  }

  animate(): void {
    this.animationProps.currentFrame++

    if (this.animationProps.currentFrame > this.animationProps.maxFrame)
      this.animationProps.currentFrame = 0
  }

  draw(context: CanvasRenderingContext2D): void {
    const spriteIndex = this.getPaddleSprite()
    const spriteStartPos = new SpriteHelper().getSpriteStartPos(spriteIndex, this.spriteSheetData)
    SpriteHelper.drawSprite(
      spriteStartPos,
      this.position,
      this.dimensions,
      this.spriteSheetData,
      context
    )
    // context.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.dimensions.width,
    //   this.hitbox.dimensions.height
    // )
  }

  getPaddleSprite(): number {
    const animationState = SpriteHelper.getAnimationCycleSprite(this.animationProps, 6)
    if (animationState === 1 || animationState === 7) return 0
    else if (animationState === 2 || animationState === 6) return 1
    else if (animationState === 3 || animationState === 5) return 2
    else return 3
  }

  updateHitShapePosition(): void {
    this.hitbox.position = this.position
  }
}
