import { Dimensions } from '../components'

export type SpriteSheetData = {
  spriteSheetImage: HTMLImageElement
  spriteSize: Dimensions
  spritePadding: Dimensions
  spriteSheetSize: {
    columns: number
    rows: number
  }
}
