/* eslint-disable no-undef */
import { makeGame } from '../factories'

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
