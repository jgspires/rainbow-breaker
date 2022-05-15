import { RenderEntitiesUseCase } from '../../data/useCases/RenderEntitiesUseCase'
import { IGame } from '../../domain/contracts'
import { BasicBlock } from '../../domain/entities/blocks/BasicBlock'
import { GameTime } from '../../domain/entities/engine'
import { IEntityManager } from '../../solutions/contracts'
import { makeRenderEntitiesUseCase } from '../factories/useCases'

export class Game implements IGame {
  gameTime: GameTime
  fpsInterval: number
  frameCounter: number

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
  }

  gameLoop(currentTime: number): void {
    console.log(currentTime)
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
    // if (this.entityManager.subscribers.length > 0)
    //   this.entityManager.subscribers[0].entity.position.y += 5
  }

  gameStart() {
    this.gameLoop(window.performance.now())
    this.entityManager.addEntity(new BasicBlock({ x: 20, y: 20 }))
  }
}
