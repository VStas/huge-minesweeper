import { observer } from 'mobx-react-lite';
import React from 'react';
import { field, BOMB, GameField } from '../../store/GameField';
import { cn as createCn } from '@bem-react/classname'
import { RootContext } from '../../context';

import './Header.css';

interface Props {
    field: GameField;
}

const cn = createCn('header');

export const Header: React.FC<Props> = observer(() => {
    const rootStore = React.useContext(RootContext);

    return (
        <div className={cn()}>
            <div className={cn('stats')}>
                <div>Flags left: 1</div>
                <div>Cells to open: 1</div>
            </div>
            <div className={cn('smiley')}>
                <button>😊</button>
            </div>
        </div>
    );
});



