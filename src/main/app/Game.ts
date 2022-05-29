import { IBall, IGame, IPaddle } from '../../domain/contracts'
import { BasicBlock, HeavyBlock } from '../../domain/entities/blocks/'
import { GameDirection, GameTime } from '../../domain/entities/engine'
import { Ball, Paddle } from '../../domain/entities'
import { IBlockStager, IEntityManager } from '../../solutions/contracts'
import {
  makeAcceleratePaddleUseCase,
  makeCheckEntityCollisionUseCase,
  makeKeepEntityInBoundsUseCase,
  makeRenderEntitiesUseCase,
  makeUpdateEntitiesUseCase
} from '../factories/useCases'
import { IBlock } from '../../domain/contracts/blocks'
import { makeLaunchBallUseCase } from '../factories/useCases/LaunchBallUseCase'
import { makeMoveBallWithPaddleUseCase } from '../factories/useCases/MoveBallWithPaddleUseCase'

export class Game implements IGame {
  gameTime: GameTime
  fpsInterval: number
  frameCounter: number
  pressedKeys: Set<string>
  gameEntities: {
    playerPaddle: IPaddle
    ball: IBall
    blocks: IBlock[]
  }

  constructor(
    private canvas: HTMLCanvasElement,
    private entityManager: IEntityManager,
    private blockStager: IBlockStager,
    fps: number
  ) {
    const now = window.performance.now()
    this.gameTime = {
      then: now,
      now: now,
      startingTime: now
    }
    this.fpsInterval = 1000 / fps
    this.frameCounter = 0
    this.pressedKeys = new Set<string>()
    this.gameEntities = {
      playerPaddle: new Paddle({ x: 0, y: 0 }),
      ball: new Ball({ x: 0, y: 0 }, 10, new Paddle({ x: 0, y: 0 })),
      blocks: []
    }

    // Add key listener (preventing default window operations)
    document.addEventListener('keydown', e => this.keyDownHandler(e))
    document.addEventListener('keyup', e => this.keyUpHandler(e))
  }

  gameLoop(currentTime: number): void {
    this.handleEvents()
    this.update()
    this.render(currentTime)

    // Request Animation Frame sets the function to execute before the next repaint (rerender)
    // Thus, it executes the gameLoop before every rerender
    // as the rendering function is called within the gameLoop function.
    requestAnimationFrame(time => this.gameLoop(time))
  }

  render(currentTime: number): void {
    const gameTime = this.gameTime

    gameTime.now = currentTime
    const elapsedTime = gameTime.now - gameTime.then

    // Draws every frame according to FPS
    if (elapsedTime > this.fpsInterval) {
      this.clearCanvas()
      makeRenderEntitiesUseCase().execute({
        entityManager: this.entityManager,
        context: this.canvas.getContext('2d')!
      })

      gameTime.then = gameTime.now - (elapsedTime % this.fpsInterval)
      this.frameCounter++
    }
  }

  clearCanvas(canvas: HTMLCanvasElement = this.canvas) {
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
  }

  handleEvents() {
    const acceleratePaddleUseCase = makeAcceleratePaddleUseCase()
    if (this.directionIsPressed('right'))
      acceleratePaddleUseCase.execute({
        direction: 'right',
        paddle: this.gameEntities.playerPaddle
      })
    if (this.directionIsPressed('left'))
      acceleratePaddleUseCase.execute({
        direction: 'left',
        paddle: this.gameEntities.playerPaddle
      })
    if (this.pressedKeys.has('Space'))
      makeLaunchBallUseCase().execute({
        ball: this.gameEntities.ball,
        paddle: this.gameEntities.playerPaddle
      })
  }

  update(): void {
    const keepEntityInBounds = makeKeepEntityInBoundsUseCase()
    keepEntityInBounds.execute({
      canvas: this.canvas,
      entity: this.gameEntities.playerPaddle
    })
    keepEntityInBounds.execute({
      canvas: this.canvas,
      entity: this.gameEntities.ball
    })
    makeCheckEntityCollisionUseCase().execute({
      entityManager: this.entityManager
    })
    makeUpdateEntitiesUseCase().execute({
      entityManager: this.entityManager
    })
    makeMoveBallWithPaddleUseCase().execute({
      ball: this.gameEntities.ball,
      paddle: this.gameEntities.playerPaddle
    })
  }

  gameStart(): void {
    this.setupGame()
    this.gameLoop(window.performance.now())
  }

  keyDownHandler(e: KeyboardEvent): void {
    this.pressedKeys.add(e.code)
  }

  keyUpHandler(e: KeyboardEvent): void {
    this.pressedKeys.delete(e.code)
  }

  directionIsPressed(direction: GameDirection): boolean {
    switch (direction) {
      case 'right':
        return (
          this.pressedKeys.has('ArrowRight') ||
          this.pressedKeys.has('Numpad6') ||
          this.pressedKeys.has('KeyD')
        )
      case 'left':
        return (
          this.pressedKeys.has('ArrowLeft') ||
          this.pressedKeys.has('Numpad4') ||
          this.pressedKeys.has('KeyA')
        )
      case 'up':
        return (
          this.pressedKeys.has('ArrowUp') ||
          this.pressedKeys.has('Numpad8') ||
          this.pressedKeys.has('KeyW')
        )
      case 'down':
        return (
          this.pressedKeys.has('ArrowDown') ||
          this.pressedKeys.has('Numpad2') ||
          this.pressedKeys.has('KeyS')
        )
    }
  }

  setupGame(): void {
    this.setupPlayerPaddle()
    this.setupBall()
    const layoutSetup = [
      ['4', '4', '3', '2', '1', '1', '2', '3', '4', '4'],
      ['4', '3', '2', '1', '1', '1', '1', '2', '3', '4'],
      ['3', '2', '1', '1', '1', '1', '1', '1', '2', '3'],
      ['4', '3', '2', '1', '1', '1', '1', '2', '3', '4'],
      ['4', '4', '3', '2', '1', '1', '2', '3', '4', '4']
    ]
    this.blockStager.addLayout(layoutSetup)
    const layout = this.blockStager.createLayout(0)!
    for (const block of layout) {
      this.entityManager.addEntity(block)
    }
  }

  setupPlayerPaddle(): void {
    this.gameEntities.playerPaddle.position = {
      x: this.canvas.width / 2,
      y: this.canvas.height - 40
    }
    this.gameEntities.playerPaddle.position.x -= this.gameEntities.playerPaddle.dimensions.width / 2
    this.entityManager.addEntity(this.gameEntities.playerPaddle, true)
  }

  setupBall(): void {
    this.gameEntities.ball.position = { ...this.gameEntities.playerPaddle.position }
    this.gameEntities.ball.position.x += this.gameEntities.playerPaddle.dimensions.width / 2
    this.gameEntities.ball.position.y -= this.gameEntities.ball.radius
    this.gameEntities.ball.ballProps.paddle = this.gameEntities.playerPaddle
    this.entityManager.addEntity(this.gameEntities.ball, true)
  }
}
