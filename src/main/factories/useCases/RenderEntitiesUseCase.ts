import { RenderEntitiesUseCase } from '../../../data/useCases/RenderEntitiesUseCase'

export const makeRenderEntitiesUseCase = (): RenderEntitiesUseCase => {
  return new RenderEntitiesUseCase()
}
