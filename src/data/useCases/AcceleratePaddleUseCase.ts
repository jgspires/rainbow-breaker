import { IAcceleratePaddle } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, left, right } from '../../shared'

export class AcceleratePaddleUseCase implements IAcceleratePaddle {
  execute(props: IAcceleratePaddle.Props): Either<IUseCaseError, null> {
    const paddle = props.paddle
    paddle.accelerate(props.direction)
    return right(null)
  }
}
