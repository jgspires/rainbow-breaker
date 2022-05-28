import { IMoveBallWithPaddle } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class MoveBallWithPaddleUseCase implements IMoveBallWithPaddle {
  execute(props: IMoveBallWithPaddle.Props): Either<IUseCaseError, null> {
    if (props.ball.ballProps.state !== 'paddle') return right(null)
    const paddle = props.paddle
    const ball = props.ball
    ball.position.x = paddle.position.x + paddle.dimensions.width / 2
    return right(null)
  }
}
