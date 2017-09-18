# Eventually Extreme Checkers

![Game Screenshot](/img/gameboard-screenshot.png)

My first shot at a purely javascript/jQuery game. I spent most of my time figuring out how to properly implement my jQuery UI draggable and droppable plugins. The actual game logic seemed pretty straight-forward but the actual implementation and connection of libraries I've never used was difficult. Figuring out how to use options on the plugin instead of event handlers was key in finishing this game. I feel pretty comfortable using external plugins and libraries after working through this project.

Core game logic is operational with minimal bugs.

## Technical Requirements

- [x] Display a game in the browser
- [x] Switch turns between two players, or switch turns between a player and the computer (AI)*
- [x] Design logic for winning & visually display which player won
- [x] Include separate HTML / CSS / JavaScript files
- [x] Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- [x] Use Javascript or jQuery for DOM manipulation
- [x] Deploy your game online, where the rest of the world can access it**
- [x] Use semantic markup for HTML and CSS (adhere to best practices)

## Additional Requirements

- [x] **Project Workflow:** Did you complete the user stories, wireframes, task tracking, and/or ERDs, as specified above? Did you use source control as expected for the phase of the program you’re in (detailed above)?
  - No user stories or wireframes.
  - I started by creating the gameboard using jQuery, which took me about 10-15 hours to complete, and then went on to the core game logic of generating the pieces and adding move logic to them.
  - Draggable and droppable using jQuery UI was the most difficult part of this project to get my head around and get working. After hitting this wall, researching how to fix it, and coming up with nothing, I ended up buying a whiteboard to write out the logical flow of how it would work:
  ![Whiteboard Picture](/img/whiteboard-1.jpg)
  While this was really helpful to implement for proof of concept without the draggable/droppable, this code ended up being obsolete once I figured out how to actually use the jQuery UI draggable/droppable options (which are describing events).
  - The whiteboard got a good deal of use afterwards and was pivotal in continuing to work out game logic. I spent the rest of my time trying to plug in a double jump feature to the game. While this was unsuccessful due to time constraints, it is a good jumping off point for when I pick this project back up.

- [x] **Creativity:** Did you add a personal spin or creative element into your project submission? Did you deliver something of value to the end user (not just a login button and an index page)?
  - Had an ambitious personal spin that didn't end up coming to fruition. Most of my time was getting the core functionality of dragging/dropping/validating working. Eventually there will be additional gamemodes, score tracking, game log, and local storage utilization. The gamemodes are going to be what makes the overall game deserve its title.

- [x] **Code Quality:** Did you follow code style guidance and best practices covered in class, such as spacing, modularity, and semantic naming? Did you comment your code as your instructors have in class?
  - While it can be organized further, grouping together functions and optimizations, I always strive for good readable code. I broke the core game aspects into several files: script.js for the core game functions, game-events.js for the immediately firing game events , game-object.js for the persistent game state, and build-game.js for the initialized board at the beginning of the game. I will eventually group functions together in the script.js file so the function flow is easier to read.

- [x] **Deployment:** Did you deploy your application to a public url using GitHub Pages?
  - Fully implemented on the github pages website.

## Technologies Used

- HTML/CSS
- Javascript
- jQuery
- [jQuery UI](https://jqueryui.com/)
- [jquery Modal](https://github.com/kylefox/jquery-modal)

## Additional Features/Optimizations

- [ ] AI implementation (easy, moderate, and difficult)
- [ ] Side-by-side board when playing PvP on same computer
- [ ] Jquery UI draggable affects change in opposite board
- [ ] Additional gamemodes (where the extreme comes in) such as side-by-side checkers vs AI ()
- [ ] Highlight valid moves
- [ ] Finish double-jump logic
- [ ] Add a side-log to show move-history
- [ ] Refactor some code to increase readability and flow of the program

## Bugs

- [x] Hovering over a valid cell with one piece, not actually moving the piece, and then selecting another piece with the same valid move, and moving that piece will move both pieces.
  - This was an issue with newer code. Reverted code to a previous version and the game is now validating correctly.
- [ ] There is a case where jumping a piece will destroy a piece directly opposite of the jumped piece. Rare and hard to recreate.

## Acknowledgements

### Thank you:

[kylefox](https://github.com/kylefox) for your simple yet effective modal. Will be using your work in the future.

[VladamirAus](https://github.com/VladimirAus) for giving me inspiration with draggable/droppable within a checkers grid.

[Andrew Whitaker](https://stackoverflow.com/questions/146106/how-should-i-organize-the-contents-of-my-css-files) for helping me center my gamepieces after a drop event.
