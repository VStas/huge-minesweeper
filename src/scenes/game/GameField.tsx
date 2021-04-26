import { observer } from 'mobx-react-lite';
import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { cn as createCn } from '@bem-react/classname'

import { RootContext } from '../../context';
import { Cell } from './Cell';

import './GameField.css';

const cn = createCn('game-field');

export const GameField: React.FC = observer(() => {
    const rootStore = React.useContext(RootContext);
    const {width, height} = rootStore.gameField!;
    
    return (
        <Grid
            className={cn()}
            columnCount={width}
            columnWidth={16}
            height={600}
            rowCount={height}
            rowHeight={16}
            width={1024}
        >
            {Cell}
        </Grid>
    );
});
