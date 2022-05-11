import { Position } from '../entities/components'

export interface IEntity {
  position: Position
  draw(context: CanvasRenderingContext2D): void
  update(): void
}
