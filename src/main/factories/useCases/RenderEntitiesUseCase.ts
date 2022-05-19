import { RenderEntitiesUseCase } from '../../../data/useCases'

export const makeRenderEntitiesUseCase = (): RenderEntitiesUseCase => {
  return new RenderEntitiesUseCase()
}
