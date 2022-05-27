import { KeepPaddleInBoundsUseCase } from '../../../data/useCases'

export const makeKeepPaddleInBoundsUseCase = (): KeepPaddleInBoundsUseCase => {
  return new KeepPaddleInBoundsUseCase()
}
