import { defaultBlock } from '../../domain/contracts/blocks'
import { BlockStager } from '../../solutions'
import { IBlockStager, IEntityManager } from '../../solutions/contracts'
import { EntityManager } from '../../solutions/EntityManager'
import { Game } from '../app/Game'

export const makeGame = (canvas: HTMLCanvasElement, fps: number): Game => {
  const entityManager: IEntityManager = new EntityManager()
  const blockStager: IBlockStager = new BlockStager(canvas, {
    x: defaultBlock.dimensions.width + 5,
    y: defaultBlock.dimensions.height + 5
  })
  return new Game(canvas, entityManager, blockStager, fps)
}
