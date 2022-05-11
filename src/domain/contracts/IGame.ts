export interface IGame {
  gameLoop(currentTime: number): void

  render(currentTime: number): void

  handleEvents(): void

  update(): void

  gameStart(): void
}
