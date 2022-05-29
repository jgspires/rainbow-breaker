import { BallProps, IBall } from '../contracts/'
import { HitType, IHitShape } from '../contracts/collision'
import { Hitcircle, Point } from './components'
import { GameDirection, SpriteSheetData } from './engine'
import { SpriteHelper } from './utils'

export class Ball implements IBall {
  destroyed: boolean
  position: Point
  spriteSheetData: SpriteSheetData
  ballProps: BallProps
  hitcircle: Hitcircle
  radius: number

  constructor(position: Point, radius: number) {
    this.position = position
    this.radius = radius
    this.hitcircle = new Hitcircle(position, radius, this.collide, 'ball')
    this.destroyed = false

    this.spriteSheetData = {
      spriteSheetImage: document.getElementById('ball-sprite-sheet')! as HTMLImageElement,
      spritePadding: { width: 0, height: 0 },
      spriteSize: { width: 78, height: 78 },
      spriteSheetSize: {
        columns: 1,
        rows: 1
      }
    }

    this.ballProps = {
      state: 'paddle',
      velocity: {
        x: 0.0,
        y: 0.0
      },
      maxVelocity: 7.0
    }
  }

  launch(paddleVelocity: number): void {
    const launchVelocity = this.ballProps.maxVelocity * -1
    this.ballProps.state = 'moving'
    if (paddleVelocity > 0) {
      this.ballProps.velocity.y = launchVelocity
      this.ballProps.velocity.x = -launchVelocity
    } else if (paddleVelocity < 0) {
      this.ballProps.velocity.y = launchVelocity
      this.ballProps.velocity.x = launchVelocity
    } else this.ballProps.velocity.y = launchVelocity
  }

  accelerate(direction: GameDirection): void {
    throw new Error('Method not implemented.')
  }

  move(): void {
    this.position.x = this.position.x + this.ballProps.velocity.x
    this.position.y = this.position.y + this.ballProps.velocity.y
    this.updateHitShapePosition()
  }

  keepInBounds(canvas: HTMLCanvasElement): void {
    if (this.position.x < 0) {
      this.position.x = 0
    } else if (this.position.x + this.radius > canvas.width)
      this.position.x = canvas.width - this.radius
  }

  collide(hitType: HitType): void {
    console.log(`Ball colliding with hitType: ${hitType}`)
  }
  getHitShape(): IHitShape {
    return this.hitcircle
  }

  draw(context: CanvasRenderingContext2D): void {
    const spriteStartPos = new SpriteHelper().getSpriteStartPos(0, this.spriteSheetData)
    const adjustedPosition: Point = {
      x: this.position.x - this.radius,
      y: this.position.y - this.radius
    }
    SpriteHelper.drawSprite(
      spriteStartPos,
      adjustedPosition,
      { height: this.radius * 2, width: this.radius * 2 },
      this.spriteSheetData,
      context
    )
    // context.arc(
    //   this.hitcircle.position.x,
    //   this.hitcircle.position.y,
    //   this.hitcircle.radius,
    //   0,
    //   2 * Math.PI
    // )
    // context.stroke()
  }

  update(): void {
    this.move()
    this.updateHitShapePosition()
  }

  updateHitShapePosition(): void {
    this.hitcircle.position = this.position
  }
}
