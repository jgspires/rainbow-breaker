import { IKeepPaddleInBounds } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class KeepPaddleInBoundsUseCase implements IKeepPaddleInBounds {
  execute(props: IKeepPaddleInBounds.Props): Either<IUseCaseError, null> {
    const paddle = props.paddle
    paddle.keepInBounds(props.canvas)
    return right(null)
  }
}
