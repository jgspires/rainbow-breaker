import { IGame } from '../domain/contracts'
import { GameTime } from '../domain/entities/engine'
import { IGameRenderer } from './contracts/IGameRenderer'

export class GameRenderer implements IGameRenderer {
  gameTime: GameTime
  fpsInterval: number
  frameCounter: number

  constructor(private canvas: HTMLCanvasElement, fps: number) {
    const now = window.performance.now()
    this.gameTime = {
      then: now,
      now: now,
      startingTime: now
    }
    this.fpsInterval = 1000 / fps
    this.frameCounter = 0
  }

  render(currentTime: number, game: IGame): void {
    const gameTime = this.gameTime

    gameTime.now = currentTime
    const elapsedTime = gameTime.now - gameTime.then

    // Draws every frame
    if (elapsedTime > this.fpsInterval) {
      this.clearCanvas()

      gameTime.then = gameTime.now - (elapsedTime % this.fpsInterval)
      console.log(elapsedTime % this.fpsInterval)
      this.frameCounter++
    }

    requestAnimationFrame(time => game.gameLoop(time))
  }

  // drawFps(context = this.canvas.getContext('2d')!): void {
  //   const currentFps = 1000 / (this.gameTime.now - this.gameTime.then)
  //   context.fillStyle = 'white'
  //   context.font = '30px Arial'
  //   context.fillText(`${Math.round(currentFps)}`, this.canvas.width - 40, 30)
  // }

  clearCanvas(canvas: HTMLCanvasElement = this.canvas) {
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
  }
}
