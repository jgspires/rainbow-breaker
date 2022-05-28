import { AnimationProps, IPaddle, PaddleDirection } from '../contracts'
import { HitType, IHitShape } from '../contracts/collision'
import { Dimensions, Hitbox, Position, VelocityProps } from './components'
import { SpriteSheetData } from './engine'
import { SpriteHelper } from './utils'

export class Paddle implements IPaddle {
  position: Position
  dimensions: Dimensions
  hitbox: Hitbox
  destroyed: boolean = false
  animationProps: AnimationProps = {
    currentFrame: 0,
    maxFrame: 360
  }
  velocityProps: VelocityProps = {
    currentVelocity: 0.0,
    acceleration: 1.5,
    deceleration: 0.25,
    maxVelocity: 5.0
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
    this.hitbox = new Hitbox(this.position, this.dimensions, this.collide, 'paddle')
  }

  accelerate(direction: PaddleDirection): void {
    if (
      (direction === 'right' && this.velocityProps.currentVelocity < 0) ||
      (direction === 'left' && this.velocityProps.currentVelocity > 0)
    )
      this.velocityProps.currentVelocity = 0

    if (direction === 'right') this.velocityProps.currentVelocity += this.velocityProps.acceleration
    else this.velocityProps.currentVelocity -= this.velocityProps.acceleration

    if (this.velocityProps.currentVelocity > this.velocityProps.maxVelocity)
      this.velocityProps.currentVelocity = this.velocityProps.maxVelocity
    else if (this.velocityProps.currentVelocity < this.velocityProps.maxVelocity * -1)
      this.velocityProps.currentVelocity = this.velocityProps.maxVelocity * -1
  }

  update(): void {
    this.animate()
    this.move()
  }

  move(): void {
    if (this.velocityProps.currentVelocity > 0)
      this.velocityProps.currentVelocity = Math.max(
        this.velocityProps.currentVelocity - this.velocityProps.deceleration,
        0
      )
    else if (this.velocityProps.currentVelocity < 0)
      this.velocityProps.currentVelocity = Math.min(
        this.velocityProps.currentVelocity + this.velocityProps.deceleration,
        0
      )

    this.position.x = this.position.x + this.velocityProps.currentVelocity
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
  }

  getPaddleSprite(): number {
    const animationState = SpriteHelper.getAnimationCycleSprite(this.animationProps, 6)
    if (animationState === 1 || animationState === 7) return 0
    else if (animationState === 2 || animationState === 6) return 1
    else if (animationState === 3 || animationState === 5) return 2
    else return 3
  }
}
