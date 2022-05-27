import { ICheckEntityCollision } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class CheckEntityCollisionUseCase implements ICheckEntityCollision {
  execute(props: ICheckEntityCollision.Props): Either<IUseCaseError, null> {
    props.entityManager.checkMovedEntitiesCollision()
    return right(null)
  }
}
