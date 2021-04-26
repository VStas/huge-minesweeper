import React from 'react';
import { observer } from 'mobx-react-lite';
import { GridChildComponentProps } from 'react-window';
import { cn as createCn } from '@bem-react/classname'

import { BOMB } from '../../store/GameField';
import { CellStatus, GameState } from '../../types';
import { RootContext } from '../../context';

import './Cell.css';

const LEFT_MOUSE_BUTTON = 0;

const cn = createCn('cell');

export const Cell: React.FC<GridChildComponentProps> = observer(({ columnIndex, rowIndex, style }) => {
    const rootStore = React.useContext(RootContext);
    const {state} = rootStore;
    const field = rootStore.gameField!;

    const cell = field.getCellByCoords(columnIndex, rowIndex);
    const cellStatus = cell.status;

    const value = React.useMemo(() => {
        if (cellStatus !== CellStatus.OPEN && state !== GameState.LOST) {
            return;
        }
        return field.getValueByCoords(columnIndex, rowIndex);
    }, [columnIndex, rowIndex, field, cellStatus, state]);

    function handleMouseDown(e: React.MouseEvent) {
        if (state !== GameState.PLAYING) {
            return;
        }
        if (e.button === LEFT_MOUSE_BUTTON) {
            if (cellStatus !== CellStatus.INITIAL) {
                return;
            }
            field.open(columnIndex, rowIndex);
            return;
        }
        field.toggleFlag(columnIndex, rowIndex);
    }
  
    return (
        <div
            className={cn({value, status: cellStatus})}
            style={style}
            onMouseDown={handleMouseDown}
            onContextMenu={(e) => {e.preventDefault();}}
        >
            {value !== BOMB && value !== 0 && value}
        </div>
    );
});
