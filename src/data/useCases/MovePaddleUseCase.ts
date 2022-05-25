import { IMovePaddle } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class MovePaddleUseCase implements IMovePaddle {
  execute(props: IMovePaddle.Props): Either<IUseCaseError, null> {
    props.entityManager.updateEntities()
    return right(null)
  }
}
