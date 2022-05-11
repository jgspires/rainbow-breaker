import { IGame } from '../../domain/contracts'
import { GameTime } from '../../domain/entities/engine'

export interface IGameRenderer {
  gameTime: GameTime
  fpsInterval: number
  frameCounter: number

  render(currentTime: number, game: IGame): void
}
