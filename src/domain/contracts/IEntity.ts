import { Dimensions, Position } from '../entities/components'
import { SpriteSheetData } from '../entities/engine'

export interface IEntity {
  destroyed: boolean
  position: Position
  dimensions: Dimensions
  spriteSheetData: SpriteSheetData
  draw(context: CanvasRenderingContext2D): void
  update(): void
}
