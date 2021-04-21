import { observer } from 'mobx-react-lite';
import React from 'react';
import { field, BOMB, GameField } from '../../store/GameField';
import { cn as createCn } from '@bem-react/classname'

interface Props {
    field: GameField;
}

export const Header: React.FC<Props> = observer(({ field }) => {
    return (
        <div>Flags left: {field.flagsLeft}</div>
    );
});


