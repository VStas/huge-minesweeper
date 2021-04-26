import { observer } from 'mobx-react-lite';
import React from 'react';
import { cn as createCn } from '@bem-react/classname'

import { RootContext } from '../../context';
import { GameState } from '../../types';

import './Header.css';

const cn = createCn('header');

export const Header: React.FC = observer(() => {
    const rootStore = React.useContext(RootContext);
    const {state} = rootStore;
    const {flagsLeft, cellsToOpen} = rootStore.gameField!;

    return (
        <div className={cn()}>
            <div className={cn('stats')}>
                <div>Flags left: {flagsLeft}</div>
                <div>Cells to open: {cellsToOpen}</div>
            </div>
            <div>
                <button onClick={rootStore.resetGame}>
                    {state === GameState.WON ? '😎' : state === GameState.LOST ? '☹️' : '🙂'}
                </button>
            </div>
        </div>
    );
});



