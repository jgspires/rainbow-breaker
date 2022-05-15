import { Dimensions, Position } from '../entities/components'

export interface IEntity {
  position: Position
  dimensions: Dimensions
  draw(context: CanvasRenderingContext2D): void
  update(): void
}
