import { IUseCaseError } from '../../domain/useCases/errors'
import { IRenderEntities } from '../../domain/useCases/IRenderEntities'
import { Either, right } from '../../shared'

export class RenderEntitiesUseCase implements IRenderEntities {
  execute(props: IRenderEntities.Props): Either<IUseCaseError, null> {
    props.entityManager.drawEntities(props.context)
    return right(null)
  }
}
