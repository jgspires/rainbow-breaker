import { Either } from '../../../shared'
import { IUseCaseError } from '../errors'

export interface IUseCase<Props, SuccessResponse = null, ErrorResponse = IUseCaseError> {
  execute(props: Props): Either<ErrorResponse, SuccessResponse>
}
