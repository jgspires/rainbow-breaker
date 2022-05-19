import { IEntity, IGame } from '../../domain/contracts'
import { BasicBlock } from '../../domain/entities/blocks/'
import { GameTime } from '../../domain/entities/engine'
import { Paddle } from '../../domain/entities/Paddle'
import { IEntityManager } from '../../solutions/contracts'
import { makeRenderEntitiesUseCase, makeUpdateEntitiesUseCase } from '../factories/useCases'

export class Game implements IGame {
  gameTime: GameTime
  fpsInterval: number
  frameCounter: number
  playerPaddle: IEntity

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

  // eslint-disable-next-line no-empty-function
  handleEvents() {}

  update() {
    // add collision check observer using hitboxes
    // if (this.entityManager.subscribers.length > 0)
    //   this.entityManager.subscribers[0].entity.position.y += 5
    makeUpdateEntitiesUseCase().execute({
      entityManager: this.entityManager
    })
  }

  gameStart() {
    this.setupPlayerPaddle()
    this.gameLoop(window.performance.now())
    this.entityManager.addEntity(new BasicBlock({ x: 20, y: 20 }))
    this.entityManager.addEntity(this.playerPaddle)
  }

  setupPlayerPaddle() {
    this.playerPaddle = new Paddle({ x: this.canvas.width / 2, y: this.canvas.height - 40 })
    this.playerPaddle.position.x -= this.playerPaddle.dimensions.width / 2
  }
}
