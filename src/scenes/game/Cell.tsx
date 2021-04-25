import React from 'react';
import { observer } from 'mobx-react-lite';
import { GridChildComponentProps } from 'react-window';
import { cn as createCn } from '@bem-react/classname'

import { BOMB } from '../../store/GameField';
import { CellStatus } from '../../types';
import { RootContext } from '../../context';

import './GameField.css';
import { GameState } from '../../store/Root';

const cn = createCn('cell');

export const Cell: React.FC<GridChildComponentProps> = observer(({ columnIndex, rowIndex, style }) => {
    const rootStore = React.useContext(RootContext);
    const {state} = rootStore;
    const field = rootStore.gameField!;

    const cell = field.getCellByCoords(columnIndex, rowIndex);
    const status = cell.status;

    // круто что мемо. И по памяти огонь и не надо пересчитывать
    const value = React.useMemo(() => {
        if (status !== CellStatus.OPEN && state !== GameState.LOST) {
            return;
        }
      return field.getValueByCoords(columnIndex, rowIndex);
    }, [columnIndex, rowIndex, field, status, state]);

    function handleMouseDown(e: React.MouseEvent) {
        if (state !== GameState.PLAYING) {
            return;
        }
        if (e.button === 0) {
            if (status !== CellStatus.INITIAL) {
                return;
            }
            field.open(columnIndex, rowIndex);
            return;
        }
        field.toggleFlag(columnIndex, rowIndex);
    }
  
    return (
        <div
            className={cn({value, status})}
            style={style}
            onMouseDown={handleMouseDown}
            onContextMenu={(e) => {e.preventDefault();}}
        >
            {value !== BOMB && value !== 0 && value}
        </div>
    );
});
