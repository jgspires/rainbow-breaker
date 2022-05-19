import { UpdateEntitiesUseCase } from '../../../data/useCases'

export const makeUpdateEntitiesUseCase = (): UpdateEntitiesUseCase => {
  return new UpdateEntitiesUseCase()
}
