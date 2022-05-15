/* eslint-disable no-undef */
import { makeGame } from '../factories'

export const IMAGE_SOURCE_FOLDER = process.env.IMAGE_SOURCE_FOLDER || '../../../imgs'

class App {
  initGame(): void {
    const gameCanvasOrNull = document.getElementById('gameField')
    if (!gameCanvasOrNull) return
    const gameCanvas = gameCanvasOrNull as HTMLCanvasElement
    makeGame(gameCanvas, 60).gameStart()
  }
}

const app = new App()
app.initGame()
