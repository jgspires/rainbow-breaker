import { ILaunchBall } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class LaunchBallUseCase implements ILaunchBall {
  execute(props: ILaunchBall.Props): Either<IUseCaseError, null> {
    if (props.ball.ballProps.state !== 'paddle') return right(null)
    const paddle = props.paddle
    const ball = props.ball
    ball.launch(paddle.paddleProps.currentVelocity)
    return right(null)
  }
}
