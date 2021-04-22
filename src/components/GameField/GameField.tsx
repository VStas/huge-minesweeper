import { observer } from 'mobx-react-lite';
import React from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import { field, BOMB } from '../../store/GameField';
import { cn as createCn } from '@bem-react/classname'

import './GameField.css';
import { CellStatus } from '../../types';

// import {field} from '../../store/GameField';

// export {field};

// export const GameField: React.FC = () => {
//     return (
//         <div className="Field">
//             {Array(10000).fill(undefined).map((v, i) => (
//                 <div key={i} />
//             ))}
//         </div>
//     );
// }

const cn = createCn('cell');

// todo м б вынести обертку, но хз, много компонентов. Если не тормозит то не надо
const Cell: React.FC<GridChildComponentProps> = observer(({ columnIndex, rowIndex, style }) => {
    // if (columnIndex === 5 && rowIndex === 5) {
    //   console.log('render');
    // }
    // return <div className={cn()} style={style} />
    const cell = field.getCell(columnIndex, rowIndex);
    const status = cell.status;
    // круто что мемо. И по памяти огонь и не надо пересчитывать
    const value = React.useMemo(() => {
      if (status !== CellStatus.OPEN) {
        return;
      }
      return field.getValue(columnIndex, rowIndex);
    }, [columnIndex, rowIndex, status]);
    // let value = isOpen ? cell.getValue() : undefined;

    function handleMouseDown(e: React.MouseEvent) {
      if (e.button === 0) {
        if (status !== CellStatus.INITIAL) {
          return;
        }
        field.open(columnIndex, rowIndex);
        return;
      }
      field.toggleFlag(columnIndex, rowIndex); //todo больше логики сюда
    }
  
    return (
        <div
            className={cn({value, status})}
            style={style}
            onMouseDown={handleMouseDown}
            onContextMenu={(e) => {e.preventDefault(); e.stopPropagation();}}
        >
            {value !== BOMB && value !== 0 && value}
        </div>
    );
});

// const GridCell: React.FC<GridChildComponentProps> = ({ columnIndex, rowIndex, style, children }) => {
//   return (
//       <div style={style}>
//         <Cell columnIndex={columnIndex} rowIndex={rowIndex} />
//       </div>
//   );
// };

export const GameField: React.FC = () => (
    <Grid
      className="Grid"
      columnCount={field.width}
      columnWidth={16}
      height={600}
      rowCount={field.height}
      rowHeight={16}
      width={1200}
    >
      {Cell}
    </Grid>
  );