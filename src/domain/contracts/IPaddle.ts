import { VelocityProps } from '../entities/components'
import { IBoxCollidable } from './collision'
import { IFrameAnimated } from './IFrameAnimated'
import { IRectangle } from './IRectangle'

export type PaddleDirection = 'left' | 'right'

export interface IPaddle extends IBoxCollidable, IFrameAnimated, IRectangle {
  velocityProps: VelocityProps
  accelerate(direction: PaddleDirection): void
  keepInBounds(canvas: HTMLCanvasElement): void
}
