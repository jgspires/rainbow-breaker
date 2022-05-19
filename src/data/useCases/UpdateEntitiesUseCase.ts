import { IUpdateEntities } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'
import { IEntityManager } from '../../solutions/contracts'

export class UpdateEntitiesUseCase implements IUpdateEntities {
  execute(props: { entityManager: IEntityManager }): Either<IUseCaseError, null> {
    props.entityManager.updateEntities()
    return right(null)
  }
}
