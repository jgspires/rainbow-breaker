import { IUseCaseError } from '../../domain/useCases/errors'
import { IRenderEntities } from '../../domain/useCases/IRenderEntities'
import { Either, right } from '../../shared'
import { IEntityManager } from '../../solutions/contracts'

export class RenderEntitiesUseCase implements IRenderEntities {
  execute(props: {
    entityManager: IEntityManager
    context: CanvasRenderingContext2D
  }): Either<IUseCaseError, null> {
    props.entityManager.drawEntities(props.context)
    return right(null)
  }
}
