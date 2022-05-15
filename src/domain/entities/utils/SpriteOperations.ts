import { Position } from '../components'
import { SpriteSheetData } from '../engine'

export class SpriteOperations {
  getSpriteStartPos(spriteIndex: number, spriteData: SpriteSheetData): Position {
    let currentRow = 1
    const startPos: Position = {
      x: 0,
      y: 0
    }
    while (spriteIndex >= spriteData.spriteSheetSize.columns) {
      spriteIndex -= spriteData.spriteSheetSize.columns
      startPos.y += spriteData.spriteSize.height + spriteData.spritePadding.height
      currentRow++
      if (currentRow > spriteData.spriteSheetSize.rows) return { x: 0, y: 0 }
    }
    startPos.x += (spriteData.spriteSize.width + spriteData.spritePadding.width) * spriteIndex
    return startPos
  }
}
