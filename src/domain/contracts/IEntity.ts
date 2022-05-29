import { Dimensions, Point } from '../entities/components'
import { SpriteSheetData } from '../entities/engine'

export interface IEntity {
  destroyed: boolean
  position: Point
  spriteSheetData: SpriteSheetData
  draw(context: CanvasRenderingContext2D): void
  update(): void
}
