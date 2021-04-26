import React from 'react';
import { cn as createCn } from '@bem-react/classname'
import { observer } from 'mobx-react-lite';

import { GameField } from './scenes/game/GameField';
import { Header } from './scenes/game/Header';
import { Menu } from './scenes/menu/Menu';
import { RootContext } from './context';
import { GameState } from './types';

import './App.css';

const cn = createCn('app');

const App = observer(() => {
    const rootStore = React.useContext(RootContext);

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

export default App
