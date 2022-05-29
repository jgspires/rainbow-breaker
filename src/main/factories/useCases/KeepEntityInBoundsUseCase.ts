import { KeepEntityInBoundsUseCase } from '../../../data/useCases'

export const makeKeepEntityInBoundsUseCase = (): KeepEntityInBoundsUseCase => {
  return new KeepEntityInBoundsUseCase()
}
