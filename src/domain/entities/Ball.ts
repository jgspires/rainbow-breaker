import console from 'console'
import { BallProps, IBall, IPaddle } from '../contracts/'
import { HitType, IHitShape } from '../contracts/collision'
import { Hitbox, Hitcircle, Point } from './components'
import { GameDirection, SpriteSheetData } from './engine'
import { SpriteHelper } from './utils'

export class Ball implements IBall {
  destroyed: boolean
  position: Point
  spriteSheetData: SpriteSheetData
  ballProps: BallProps
  hitcircle: Hitcircle
  radius: number

  constructor(position: Point, radius: number, paddle: IPaddle) {
    this.position = position
    this.radius = radius
    this.hitcircle = new Hitcircle(position, radius, this.collide.bind(this), 'ball')
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
      paddle,
      state: 'paddle',
      velocity: {
        x: 0.0,
        y: 0.0
      },
      maxVelocity: 7.0,
      noCollisionFrames: {
        current: 0,
        base: 10
      }
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

    this.ballProps.noCollisionFrames.current = this.ballProps.noCollisionFrames.base
  }

  accelerate(direction: GameDirection): void {
    throw new Error('Method not implemented.')
  }

  keepSpeedOnLimit(): void {
    if (this.ballProps.velocity.x > this.ballProps.maxVelocity)
      this.ballProps.velocity.x = this.ballProps.maxVelocity
    else if (this.ballProps.velocity.x < -this.ballProps.maxVelocity)
      this.ballProps.velocity.x = -this.ballProps.maxVelocity

    if (this.ballProps.velocity.y > this.ballProps.maxVelocity)
      this.ballProps.velocity.y = this.ballProps.maxVelocity
    else if (this.ballProps.velocity.y < -this.ballProps.maxVelocity)
      this.ballProps.velocity.y = -this.ballProps.maxVelocity
  }

  move(): void {
    this.keepSpeedOnLimit()

    this.position.x = this.position.x + this.ballProps.velocity.x
    this.position.y = this.position.y + this.ballProps.velocity.y
    this.updateHitShapePosition()
  }

  keepInBounds(canvas: HTMLCanvasElement): void {
    if (this.position.x < 0 || this.position.x + this.radius > canvas.width)
      this.ballProps.velocity.x *= -1
    if (this.position.y < 0) this.ballProps.velocity.y *= -1
  }

  collide(hitType: HitType, hitShape: IHitShape): void {
    if (this.ballProps.state !== 'moving') return
    if (hitType !== 'block' && hitType !== 'paddle') return

    if (hitType === 'paddle' && this.ballProps.noCollisionFrames.current !== 0) return
    if (hitType === 'block' && this.ballProps.noCollisionFrames.current > 8) return

    const hitbox = hitShape as Hitbox
    const side = this.getCollisionSide(hitbox)

    const maxVelocity = this.ballProps.maxVelocity

    switch (side) {
      case 'right':
        if (this.ballProps.velocity.x === 0) this.ballProps.velocity.x = maxVelocity
        this.ballProps.velocity.x *= -1
        break
      case 'left':
        if (this.ballProps.velocity.x === 0) this.ballProps.velocity.x = -maxVelocity
        this.ballProps.velocity.x *= -1
        break
      case 'up':
        if (this.ballProps.velocity.y === 0) this.ballProps.velocity.y = maxVelocity

        if (this.ballProps.paddle.paddleProps.currentVelocity > 0)
          this.ballProps.velocity.x += maxVelocity / 4
        else if (this.ballProps.paddle.paddleProps.currentVelocity < 0)
          this.ballProps.velocity.x -= maxVelocity / 4

        this.ballProps.velocity.y *= -1
        break
      case 'down':
        if (this.ballProps.velocity.y === 0) this.ballProps.velocity.y = -maxVelocity
        this.ballProps.velocity.y *= -1
        break
    }

    this.ballProps.noCollisionFrames.current = this.ballProps.noCollisionFrames.base
  }

  getCollisionSide(hitbox: Hitbox): GameDirection {
    const paddleHalfW = hitbox.dimensions.width / 2
    const paddleHalfH = hitbox.dimensions.height / 2
    const ballCenterX = this.hitcircle.position.x
    const ballCenterY = this.hitcircle.position.y + this.hitcircle.radius
    const paddleCenterX = hitbox.position.x + paddleHalfW
    const paddleCenterY = hitbox.position.y + paddleHalfH

    const distX = ballCenterX - paddleCenterX
    const distY = ballCenterY - paddleCenterY

    let minXDist = this.hitcircle.radius + paddleHalfW
    let minYDist = this.hitcircle.radius + paddleHalfH

    const depthX = distX > 0 ? minXDist - distX : -minXDist - distX
    const depthY = distY > 0 ? minYDist - distY : -minYDist - distY

    if (depthX !== 0 && depthY !== 0) {
      if (Math.abs(depthX) < Math.abs(depthY)) {
        // X axis
        if (depthX > 0) {
          return 'left'
        } else {
          return 'right'
        }
      } else {
        // Y axis
        if (depthY > 0) {
          return 'down'
        } else {
          return 'up'
        }
      }
    }
    if (depthX !== 0) return 'down'
    else return 'up'
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
    this.ballProps.noCollisionFrames.current -= 1
    if (this.ballProps.noCollisionFrames.current < 0) this.ballProps.noCollisionFrames.current = 0
  }

  updateHitShapePosition(): void {
    this.hitcircle.position = this.position
  }
}
