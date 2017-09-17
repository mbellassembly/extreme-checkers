# Eventually Extreme Checkers

![Game Screenshot](/img/gameboard-screenshot.png)

My first shot at a purely javascript/jQuery game. I spent most of my time figuring out how to properly implement my jQuery UI draggable and droppable plugins. The actual game logic seemed pretty straight-forward but the actual implementation and connection of libraries I've never used was difficult. Figuring out how to use options on the plugin instead of event handlers was key in finishing this game. I feel pretty comfortable using external plugins and libraries after working through this project.

Core game logic is operational. Still a work in progress.

Estimated time spent: **70 hours**

## Technical Requirements

- [x] Display a game in the browser
- [x] Switch turns between two players, or switch turns between a player and the computer (AI)*
- [x] Design logic for winning & visually display which player won
- [x] Include separate HTML / CSS / JavaScript files
- [x] Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- [x] Use Javascript or jQuery for DOM manipulation
- [x] Deploy your game online, where the rest of the world can access it**
- [x] Use semantic markup for HTML and CSS (adhere to best practices)

## Technologies Used

- jQuery
- [jQuery UI] (https://jqueryui.com/)
- [jquery Modal] (https://github.com/kylefox/jquery-modal)

## Additional Features/Optimizations

- [] AI implementation (easy, moderate, and difficult)
- [] Side-by-side board when playing PvP on same computer
- [] Jquery UI draggable affects change in opposite board
- [] Additional gamemodes (where the extreme comes in) such as side-by-side checkers vs AI ()
- [] Highlight valid moves
- [] Finish double-jump logic
- [] Add a side-log to show move-history
- [] Refactor some code to reduce

## Bugs

- [] Hovering over a valid cell with one piece, not actually moving the piece, and then selecting another piece with the same valid move, and moving that piece will move both pieces.
