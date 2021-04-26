HUGE Minesweeper

# Technical description

Implemented using MobX and React.

MobX model classes are located in /src/store
React components are located in /src/scenes

## Main ideas

When a game field is huge, it's impossible to render all cells at once. That's why, we use grid from 'react-window' library. It makes it possible to reuse same DOM elements when scrolling.

Interaction with any cell will NOT trigger rendering of any other cells. This is because each cell is connected to it's individual MobX cell object.

When a game field is huge, it would take time to generate a big array (or Set) with initial values for cells or bomb locations. That's why we don't do it.
The logic is very "lazy". We create a cell object ONLY when our application wants to render that particular cell. And we generate a probable bomb in a cell ONLY when when really need that information:
- when a user tries to open that cell
- when a user opens some neighour cell and we need to count bombs
- when a user looses and we need to show all bombs

Cell component uses useMemo for memoization. So we don't have to recalculate nearby bombs all the time for that cell. But that information is not stored forever in store. So we save some memory.

To save memory, each cell stores minimal data. Only it's status (INITIAL, OPEN or FLAGGED) and a boolean, if it has bomb.

If a user opens a cell and it has 0 cells nearby, we start opening cells until we reach a number or the edge of the board. This is implemented using breadth first search and a queue. Queue is implemented as a circular buffer using a regular array. After some "portions" of opened cells we render the result. so the user won't wait for too long to see some changes :)

## Bonus
For a pleasant gaming experience similar to the real game, we never want the first click on the board to lose the game. That means players are not able to click on a bomb on the first click.

## Tests
There are some tests for gameplay scenarios and util functions :)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
