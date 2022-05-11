import { Position, Dimensions } from '../../entities/components'
import { IBlock } from './IBlock'

export type BlockProps = {
  position: Position
  dimensions: Dimensions
  health: number
  colour: string
}

export abstract class AbstractBlock implements IBlock {
  static DEFAULT_DIMENSIONS: Dimensions = {
    width: 100,
    height: 25
  }

  static DEFAULT_HEALTH: number = 1

  position: Position
  dimensions: Dimensions = AbstractBlock.DEFAULT_DIMENSIONS
  health: number = AbstractBlock.DEFAULT_HEALTH
  colour: string = '#FFFFFF'

  constructor(position: Position, colour?: string, health?: number, dimensions?: Dimensions) {
    this.position = position
    this.dimensions = dimensions || this.dimensions
    this.health = health || this.health
    this.colour = colour || this.colour
  }

  update(): void {
    console.log(`updating block ${this}`)
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.colour
    context.fillRect(
      this.position.x,
      this.position.y,
      this.dimensions.width,
      this.dimensions.height
    )
  }
}
