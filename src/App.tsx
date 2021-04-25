import React from 'react';
import { GameField } from './components/GameField/GameField';
import { Header } from './components/Header/Header';
import { Settings } from './scenes/settings/Settings';
import { field } from './store/GameField';
// import logo from './logo.svg';
import './App.css';
import { cn as createCn } from '@bem-react/classname'

const cn = createCn('app');

function App() {
    return (
        <div className={cn()}>
            <h1>HUGE Minesweeper</h1>
            <Settings />
        </div>
    );
    return (
        <>
            <Header field={field} />
            <GameField />
        </>
    );
}

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
