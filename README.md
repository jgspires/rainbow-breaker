# Block Breaker

This is a simple block breaking game similar to the likes of the retro game Arkanoid, where the player controls a horizontal paddle in order to bounce a ball off it multiple times and use it break the blocks on the higher portion of the screen.

# Table of Contents
* [Repo Structure](https://github.com/jgspires/block-breaker#repo-structure)
  * [src](https://github.com/jgspires/block-breaker#src)
  * [imgs](https://github.com/jgspires/block-breaker#imgs)
  * [Screenshots](https://github.com/jgspires/block-breaker#screenshots)
* [How does it work?](https://github.com/jgspires/block-breaker#how-does-it-work)
  * [For Costumers](https://github.com/jgspires/block-breaker#costumers)
  * [For Staff](https://github.com/jgspires/block-breaker#staff)
* [Gallery](https://github.com/jgspires/block-breaker#gallery)
* [Authors](https://github.com/jgspires/block-breaker#authors)
* [License](https://github.com/jgspires/block-breaker#license)

# Description

There are 4 block types, each block type has a colour and each type takes a different amount of hits with the ball to destroy.

The ball and paddle have semi-realistic acceleration and deceleration, allowing for the ball to move more slowly or more rapidly depending on how the paddle is moving when the ball hits it. In addition, the paddle's movement also affects the ball's direction slightly, making it so skillful player control is rewarded with precision.

This game should be considered a work in progress. There is only one level and there are no "Game Over" or "You Win!" screens.
In order to play the game again after you win or lose, reloading the page is advised.

# Repo Structure

## [**src**](https://github.com/jgspires/block-breaker/tree/main/src):

Contains the source code of the game.

This game was developed using HTML5, TypeScript, CSS and Node.js. Clean Architecture and SOLID principles were used throughout the project as a means of better organizing and more efficiently implementing and updating the code base.

## [**imgs**](https://github.com/jgspires/block-breaker/tree/main/imgs):

Contains all of the images used as assets within the game, such as the ball, the paddle and the blocks.

## [**Screenshots**](https://github.com/jgspires/block-breaker/tree/main/Screenshots):

Contains many screenshots of the game in action.

All screenshots are also available near the end of this readme, at the [Gallery](https://github.com/jgspires/block-breaker#gallery) section.

# How to run it?

1) Download and install [Node.js](https://nodejs.org/en/download/) on your machine if you don't already have it.
2) Clone this repository.
3) Open your preferred command line interface (CLI) at the newly created repository folder (the folder where the package.json file is located).
4) On the CLI window you just opened, install the project's dependencies by running `npm i`.
5) On the same CLI window, run the game's webserver by running `npm run dev`.
6) Open the browser of your choice and navigate to `localhost:1234`.
7) Enjoy the game!

# Controls

* Use the arrow, WASD or numpad arrow keys in order to move the paddle left and right.
* Use spacebar to release the ball when the game starts.

# Gallery

![alt text](Screenshots/GameStart.png?raw=true "Game Start")

![alt text](Screenshots/CaughtInTheMiddle.png?raw=true "Caught in the Middle")

![alt text](Screenshots/AboutToLose.png?raw=true "About to Lose")


## Authors

* [**João Gabriel Setubal Pires**](https://github.com/jgspires)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
