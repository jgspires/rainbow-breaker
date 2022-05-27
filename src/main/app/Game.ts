import { IGame, IPaddle } from '../../domain/contracts'
import { BasicBlock } from '../../domain/entities/blocks/'
import { GameDirection, GameTime } from '../../domain/entities/engine'
import { Paddle } from '../../domain/entities/Paddle'
import { IEntityManager } from '../../solutions/contracts'
import {
  makeAcceleratePaddleUseCase,
  makeCheckEntityCollisionUseCase,
  makeKeepPaddleInBoundsUseCase,
  makeRenderEntitiesUseCase,
  makeUpdateEntitiesUseCase
} from '../factories/useCases'

export class Game implements IGame {
  gameTime: GameTime
  fpsInterval: number
  frameCounter: number
  playerPaddle: IPaddle
  pressedKeys: Set<string>

  constructor(
    private canvas: HTMLCanvasElement,
    private entityManager: IEntityManager,
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
    this.playerPaddle = new Paddle({ x: 0, y: 0 })
    this.pressedKeys = new Set<string>()

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
    if (this.keyIsPressed('right'))
      acceleratePaddleUseCase.execute({
        direction: 'right',
        paddle: this.playerPaddle,
        entityManager: this.entityManager
      })
    if (this.keyIsPressed('left'))
      acceleratePaddleUseCase.execute({
        direction: 'left',
        paddle: this.playerPaddle,
        entityManager: this.entityManager
      })
  }

  update(): void {
    makeKeepPaddleInBoundsUseCase().execute({ canvas: this.canvas, paddle: this.playerPaddle })
    makeCheckEntityCollisionUseCase().execute({
      entityManager: this.entityManager
    })
    makeUpdateEntitiesUseCase().execute({
      entityManager: this.entityManager
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

  keyIsPressed(direction: GameDirection): boolean {
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
    this.entityManager.addEntity(new BasicBlock({ x: 20, y: 20 }))
    this.entityManager.addEntity(this.playerPaddle)
  }

  setupPlayerPaddle(): void {
    this.playerPaddle = new Paddle({ x: this.canvas.width / 2, y: this.canvas.height - 40 })
    this.playerPaddle.position.x -= this.playerPaddle.dimensions.width / 2
  }
}
