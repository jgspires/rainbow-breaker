import { IEntityManager } from '../../solutions/contracts'
import { EntityManager } from '../../solutions/EntityManager'
import { Game } from '../app/Game'

export const makeGame = (canvas: HTMLCanvasElement, fps: number): Game => {
  const entityManager: IEntityManager = new EntityManager()
  return new Game(canvas, entityManager, fps)
}
