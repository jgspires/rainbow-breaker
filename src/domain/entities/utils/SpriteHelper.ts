import { AnimationProps } from '../../contracts'
import { Dimensions, Position } from '../components'
import { SpriteSheetData } from '../engine'
import tintImage from 'canvas-tint-image'

export class SpriteHelper {
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

  static getAnimationCycleSprite(animationProps: AnimationProps, spriteQty: number): number {
    const baseFrameInterval = animationProps.maxFrame / spriteQty
    let frameInterval = baseFrameInterval
    let animationState = 1
    while (animationProps.currentFrame >= frameInterval) {
      frameInterval += baseFrameInterval
      animationState++
    }
    return animationState
  }

  static drawSprite(
    subRectanglePosition: Position,
    position: Position,
    dimensions: Dimensions,
    spriteSheetData: SpriteSheetData,
    context: CanvasRenderingContext2D
  ): void {
    let imageToDraw = spriteSheetData.spriteSheetImage
    let tintedImage
    if (spriteSheetData.tint) {
      tintedImage = tintImage(
        spriteSheetData.spriteSheetImage,
        spriteSheetData.tint.colour,
        spriteSheetData.tint.opacity
      )
    }
    try {
      context.drawImage(
        tintedImage || imageToDraw,
        subRectanglePosition.x,
        subRectanglePosition.y,
        spriteSheetData.spriteSize.width,
        spriteSheetData.spriteSize.height,
        position.x,
        position.y,
        dimensions.width,
        dimensions.height
      )
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }
}
