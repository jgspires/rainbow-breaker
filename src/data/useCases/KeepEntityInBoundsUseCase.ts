import { IKeepEntityInBounds } from '../../domain/useCases'
import { IUseCaseError } from '../../domain/useCases/errors'
import { Either, right } from '../../shared'

export class KeepEntityInBoundsUseCase implements IKeepEntityInBounds {
  execute(props: IKeepEntityInBounds.Props): Either<IUseCaseError, null> {
    const entity = props.entity
    entity.keepInBounds(props.canvas)
    return right(null)
  }
}
