import { CheckEntityCollisionUseCase } from '../../../data/useCases'

export const makeCheckEntityCollisionUseCase = (): CheckEntityCollisionUseCase => {
  return new CheckEntityCollisionUseCase()
}
