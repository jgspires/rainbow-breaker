import { Position, Dimensions } from '../../entities/components'
import { IEntity } from '../IEntity'

export interface IBlock extends IEntity {
  position: Position
  dimensions: Dimensions
  health: number
  colour: string
}
