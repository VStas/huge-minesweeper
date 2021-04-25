import React from 'react';
import { GameField } from './scenes/game/GameField';
import { Header } from './scenes/game/Header';
import { Menu } from './scenes/menu/Menu';
import { GameState } from './store/Root';
// import logo from './logo.svg';
import './App.css';
import { cn as createCn } from '@bem-react/classname'
import { RootContext } from './context';
import { observer } from 'mobx-react-lite';

const cn = createCn('app');

const App = observer(() => {
    const rootStore = React.useContext(RootContext);

    console.log('App');
    return (
        <div className={cn()}>
            <h1>HUGE Minesweeper</h1>
            {
                rootStore.state === GameState.MENU &&
                <Menu onStartGame={rootStore.startGame} />
            }
            {
                rootStore.state !== GameState.MENU &&
                <>
                    <Header />
                    <GameField />
                </>
            }
        </div>
    );
});


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App
