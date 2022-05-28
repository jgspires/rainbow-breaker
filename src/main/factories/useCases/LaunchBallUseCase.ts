import { LaunchBallUseCase } from '../../../data/useCases'

export const makeLaunchBallUseCase = (): LaunchBallUseCase => {
  return new LaunchBallUseCase()
}
