import { IUpdateEntities } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class UpdateEntitiesUseCase implements IUpdateEntities {
  execute(props: IUpdateEntities.Props): Either<IUseCaseError, null> {
    props.entityManager.updateEntities()
    props.entityManager.removeDestroyedEntities()
    return right(null)
  }
}
